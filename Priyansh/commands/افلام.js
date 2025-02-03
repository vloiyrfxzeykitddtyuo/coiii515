module.exports.config = {
    name: "افلام",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "اقتراحات أفلام زومبي ورعب واكشن بشكل عشوائي",
    commandCategory: "ترفيه",
    usages: "افلام [زومبي/رعب/اكشن]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const zombieMovies = [
        { name: "World War Z", year: "2013", rating: "7.0/10", earnings: "$540 million", enjoyment: "مثير!" },
        { name: "Train to Busan", year: "2016", rating: "7.6/10", earnings: "$98 million", enjoyment: "مثير!" },
        { name: "28 Days Later", year: "2002", rating: "7.6/10", earnings: "$82 million", enjoyment: "مؤثر!" },
        { name: "Zombieland", year: "2009", rating: "7.6/10", earnings: "$102 million", enjoyment: "ممتع!" },
        { name: "Army of the Dead", year: "2021", rating: "5.8/10", earnings: "$150 million", enjoyment: "مثير!" },
        { name: "I Am Legend", year: "2007", rating: "7.2/10", earnings: "$585 million", enjoyment: "مثير!" },
        { name: "Dawn of the Dead", year: "2004", rating: "7.3/10", earnings: "$102 million", enjoyment: "مرعب!" },
        { name: "Peninsula", year: "2020", rating: "5.5/10", earnings: "$40 million", enjoyment: "مثير!" },
        { name: "Resident Evil", year: "2002", rating: "6.6/10", earnings: "$102 million", enjoyment: "ممتع!" },
        { name: "#Alive", year: "2020", rating: "6.3/10", earnings: "$5 million", enjoyment: "مؤثر!" },
        { name: "The Girl with All the Gifts", year: "2016", rating: "6.6/10", earnings: "$4 million", enjoyment: "مثير!" },
        { name: "Night of the Living Dead", year: "1968", rating: "7.8/10", earnings: "غير متوفر", enjoyment: "كلاسيكي!" },
        { name: "Warm Bodies", year: "2013", rating: "6.8/10", earnings: "$117 million", enjoyment: "ممتع!" },
        { name: "The Return of the Living Dead", year: "1985", rating: "7.2/10", earnings: "غير متوفر", enjoyment: "كلاسيكي!" },
        { name: "Day of the Dead", year: "1985", rating: "7.1/10", earnings: "غير متوفر", enjoyment: "مرعب!" },
        { name: "Black Summer", year: "2019", rating: "6.6/10", earnings: "غير متوفر", enjoyment: "مثير!" },
        { name: "Ravenous", year: "2017", rating: "6.0/10", earnings: "غير متوفر", enjoyment: "مثير!" },
        { name: "The Dead Don't Die", year: "2019", rating: "5.5/10", earnings: "$14 million", enjoyment: "غريب!" },
        { name: "Kingdom", year: "2019", rating: "8.4/10", earnings: "غير متوفر", enjoyment: "مثير!" },
        { name: "REC", year: "2007", rating: "7.4/10", earnings: "$30 million", enjoyment: "مرعب!" }
    ];

    const horrorMovies = [
        { name: "The Conjuring", year: "2013", rating: "7.5/10", earnings: "$319 million", enjoyment: "مرعب!" },
        { name: "Hereditary", year: "2018", rating: "7.3/10", earnings: "$80 million", enjoyment: "مؤثر!" },
        { name: "A Quiet Place", year: "2018", rating: "7.5/10", earnings: "$340 million", enjoyment: "مثير!" },
        { name: "The Babadook", year: "2014", rating: "6.8/10", earnings: "$10 million", enjoyment: "مثير!" },
        { name: "Get Out", year: "2017", rating: "7.7/10", earnings: "$255 million", enjoyment: "مؤثر!" },
        { name: "It", year: "2017", rating: "7.3/10", earnings: "$700 million", enjoyment: "مرعب!" },
        { name: "The Shining", year: "1980", rating: "8.4/10", earnings: "غير متوفر", enjoyment: "كلاسيكي!" },
        { name: "Alien", year: "1979", rating: "8.4/10", earnings: "$104 million", enjoyment: "مثير!" },
        { name: "The Thing", year: "1982", rating: "8.1/10", earnings: "غير متوفر", enjoyment: "كلاسيكي!" },
        { name: "Saw", year: "2004", rating: "7.6/10", earnings: "$103 million", enjoyment: "مرعب!" },
        { name: "Insidious", year: "2010", rating: "6.8/10", earnings: "$97 million", enjoyment: "مثير!" },
        { name: "The Exorcist", year: "1973", rating: "8.0/10", earnings: "$441 million", enjoyment: "كلاسيكي!" },
        { name: "Sinister", year: "2012", rating: "6.8/10", earnings: "$87 million", enjoyment: "مرعب!" },
        { name: "Midsommar", year: "2019", rating: "7.1/10", earnings: "$47 million", enjoyment: "مثير!" },
        { name: "The Witch", year: "2015", rating: "6.9/10", earnings: "$40 million", enjoyment: "مؤثر!" },
        { name: "Don't Breathe", year: "2016", rating: "7.1/10", earnings: "$89 million", enjoyment: "مثير!" },
        { name: "Bird Box", year: "2018", rating: "6.6/10", earnings: "$200 million", enjoyment: "مثير!" },
        { name: "The Ring", year: "2002", rating: "7.1/10", earnings: "$249 million", enjoyment: "مرعب!" },
        { name: "Us", year: "2019", rating: "6.8/10", earnings: "$255 million", enjoyment: "مثير!" },
        { name: "The Grudge", year: "2004", rating: "5.9/10", earnings: "$187 million", enjoyment: "مرعب!" }
    ];

    const actionMovies = [
        { name: "John Wick", year: "2014", rating: "7.4/10", earnings: "$86 million", enjoyment: "ممتع!" },
        { name: "Mad Max: Fury Road", year: "2015", rating: "8.1/10", earnings: "$375 million", enjoyment: "مثير!" },
        { name: "The Dark Knight", year: "2008", rating: "9.0/10", earnings: "$1 billion", enjoyment: "كلاسيكي!" },
        { name: "Inception", year: "2010", rating: "8.8/10", earnings: "$836 million", enjoyment: "ممتع!" },
        { name: "Mission: Impossible", year: "1996", rating: "7.1/10", earnings: "$457 million", enjoyment: "مثير!" },
        { name: "Die Hard", year: "1988", rating: "8.2/10", earnings: "$140 million", enjoyment: "ممتع!" },
        { name: "The Matrix", year: "1999", rating: "8.7/10", earnings: "$463 million", enjoyment: "مثير!" },
        { name: "Gladiator", year: "2000", rating: "8.5/10", earnings: "$460 million", enjoyment: "ممتع!" },
        { name: "Casino Royale", year: "2006", rating: "8.0/10", earnings: "$606 million", enjoyment: "مثير!" },
        { name: "Edge of Tomorrow", year: "2014", rating: "7.9/10", earnings: "$370 million", enjoyment: "ممتع!" },
        { name: "Avengers: Endgame", year: "2019", rating: "8.4/10", earnings: "$2.798 billion", enjoyment: "ممتع!" },
        { name: "Top Gun: Maverick", year: "2022", rating: "8.3/10", earnings: "$1.5 billion", enjoyment: "ممتع!" },
        { name: "The Bourne Identity", year: "2002", rating: "7.9/10", earnings: "$214 million", enjoyment: "ممتع!" },
        { name: "Black Panther", year: "2018", rating: "7.3/10", earnings: "$1.347 billion", enjoyment: "مثير!" },
        { name: "The Raid", year: "2011", rating: "7.6/10", earnings: "$15 million", enjoyment: "مثير!" },
        { name: "Logan", year: "2017", rating: "8.1/10", earnings: "$619 million", enjoyment: "مؤثر!" },
        { name: "300", year: "2006", rating: "7.6/10", earnings: "$456 million", enjoyment: "مثير!" },
        { name: "Skyfall", year: "2012", rating: "7.8/10", earnings: "$1.1 billion", enjoyment: "ممتع!" },
        { name: "Fast Five", year: "2011", rating: "7.3/10", earnings: "$626 million", enjoyment: "مثير!" },
        { name: "Wonder Woman", year: "2017", rating: "7.4/10", earnings: "$821 million", enjoyment: "ممتع!" }
    ];

    const getRandomMovie = (movies) => {
        const randomIndex = Math.floor(Math.random() * movies.length);
        return movies[randomIndex];
    };

    const handleCommand = (category) => {
        let message = "";
        let emoji = "";
        let selectedMovie;

        switch (category.toLowerCase()) {
            case "زومبي":
                emoji = "🧟";
                selectedMovie = getRandomMovie(zombieMovies);
                message = `${emoji} فيلم زومبي مقترح:\n\nاسم الفيلم: ${selectedMovie.name}\nسنة الإصدار: ${selectedMovie.year}\nالتقييم: ${selectedMovie.rating}\nالإيرادات: ${selectedMovie.earnings}\nالمتعة: ${selectedMovie.enjoyment}`;
                break;
            case "رعب":
                emoji = "👻";
                selectedMovie = getRandomMovie(horrorMovies);
                message = `${emoji} فيلم رعب مقترح:\n\nاسم الفيلم: ${selectedMovie.name}\nسنة الإصدار: ${selectedMovie.year}\nالتقييم: ${selectedMovie.rating}\nالإيرادات: ${selectedMovie.earnings}\nالمتعة: ${selectedMovie.enjoyment}`;
                break;
            case "اكشن":
                emoji = "💥";
                selectedMovie = getRandomMovie(actionMovies);
                message = `${emoji} فيلم أكشن مقترح:\n\nاسم الفيلم: ${selectedMovie.name}\nسنة الإصدار: ${selectedMovie.year}\nالتقييم: ${selectedMovie.rating}\nالإيرادات: ${selectedMovie.earnings}\nالمتعة: ${selectedMovie.enjoyment}`;
                break;
            default:
                message = "الرجاء اختيار نوع الأفلام: زومبي، رعب، أو اكشن\nمثال: افلام زومبي";
        }

        return message;
    };

    const category = args[0];
    const response = handleCommand(category || "");
    
    return api.sendMessage(response, event.threadID, event.messageID);
};
