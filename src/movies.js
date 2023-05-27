// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const directors = moviesArray.map(movie => movie.director)
  const cleanDirectors = Array.from(new Set(directors))
  return cleanDirectors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const stevenMovies = moviesArray.filter(movie => {
    const movieDirector = movie.director

    if (movieDirector != 'Steven Spielberg') {
      return false;
    }

    const genre = movie.genre

    return genre.includes('Drama')

  })

  return stevenMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  const moviesLength = moviesArray.length;

  if (moviesLength === 0) {
    return 0;
  }

  const totalScore = moviesArray.reduce((sum, movie) => {
    if (typeof movie.score === 'number') {
      return sum + movie.score;
    }
    return sum;
  }, 0);

  const averageScore = totalScore / moviesLength;

  return parseFloat(averageScore.toFixed(2));
}



// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(movie => movie.genre.includes('Drama'))
  return scoresAverage(dramaMovies)
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const movies = [...moviesArray]

  if (movies.length === 1) {
    return movies
  }
  const yearOrder = movies.sort((movieA, movieB) => {

    if (movieA.year === movieB.year) {
      return movieA.title.localeCompare(movieB.title)
    }

    return movieA.year - movieB.year;
  })


  return yearOrder;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const movieTitle = moviesArray.map(movie => movie.title)

  const ordered = movieTitle.sort((movieA, movieB) => {
    return movieA.localeCompare(movieB)
  })

  return ordered.splice(0, 20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map(movie => {
    const { duration } = movie;
    let minutes = 0;

    if (!duration.includes(' ')) {
      minutes = duration.includes('h') ? parseInt(duration) * 60 : parseInt(duration);
      return { ...movie, duration: minutes };
    }

    const [hourPart, minutesPart] = duration.split(' ');
    const hoursToMinutes = parseInt(hourPart) * 60;
    const minuteFromPart = parseInt(minutesPart);
    minutes = hoursToMinutes + minuteFromPart;

    return { ...movie, duration: minutes };
  });
}


// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray.length) {
    return null;
  }

  if (moviesArray.length === 1) {
    return `The best year was ${moviesArray[0].year} with an average score of ${moviesArray[0].score}`;
  }

  const years = [...new Set(moviesArray.map(movie => movie.year))];
  let bestItem = {};

  years.forEach(year => {
    const movies = getMoviesInYear(year, moviesArray);
    const yearScoreAverage = scoresAverage(movies);

    if (!bestItem.score || yearScoreAverage > bestItem.score || (yearScoreAverage === bestItem.score && year < bestItem.year)) {
      bestItem = { year, score: yearScoreAverage };
    }
  });

  return `The best year was ${bestItem.year} with an average score of ${bestItem.score}`;
}


getMoviesInYear = (year, movies) => {
  return movies.filter(movie => movie.year === year)
}

