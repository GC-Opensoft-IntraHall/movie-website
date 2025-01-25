import express from "express";
const router = express.Router();
import { Movies } from "../models/Movies.js";

//ROUTE 1:Get All the Notes using GET:"/api/movies/fetchAllMovies".login Required.

router.get("/fetchAllMovies", async (req, res) => {
  try {
    const movies = await Movies.find().limit(10); // find is used because we need to find 'all' notes of a user.
    res.json(movies); // req.user can be used because we have imported fetchuser.
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Search movies by keywords

router.get("/search", async (req, res) => {
  try {
    const result = await Movies.aggregate([
      {
        $search: {
          index: "search-movies",
          text: {
            query: req.query.t,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/autocomplete", async (req, res) => {
  try {
    const agg = [
      {
        $search: {
          index: "autocomplete-text",
          autocomplete: { query: req.query.t, path: "title" },
        },
      },
      { $limit: 20 },
    ];
    // run pipeline
    const result = await Movies.aggregate(agg).limit(7);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4:Search Movies by Category
router.get('/category',  async (req, res) => {
  
  try {
        
    const result= await Movies.aggregate([
      {
        $search: {
          index: "byCategory",
          text: {
            query: req.query.t,
            path: {
              wildcard: "*"
            }
          }
        }
      },
      {$limit: 20}
    ])
    res.json(result);
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}
})

//ROUTE 5:Search Movies by Id
router.get('/:id',  async (req, res) => {
  
  try {
        
   let movie = await Movies.findById(req.params.id);
   res.json(movie);
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}
})

router.post('/fuzzy', async (req, res) => {
  try {
    const agg = [
      {
        $search: {
          index: "fuzzy",
          text: { query: req.query.t, path: "title" , fuzzy: {
            maxEdits: 2,
            prefixLength: 1,
            maxExpansions: 10,
          }, },
        },
      },
      { $limit: 20 },
    ];
    // run pipeline
    const result = await Movies.aggregate(agg).limit(7);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});


export default router;
