export default function MovieListItem({ movieName , movieImage}) {
    return (
        <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-full rounded-t-lg h-96 md:h-24 md:w-20 md:rounded-none md:rounded-s-lg" src={movieImage} alt=""/>
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movieName}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">2022</p>
          </div>
      </a>

    );
}