module.exports.config = {
    name: "افلام",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "اقتراحات أفلام زومبي ورعب واكشن",
    commandCategory: "ترفيه",
    usages: "افلام [زومبي/رعب/اكشن]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const zombieMovies = [
        { name: "World War Z", year: "2013", rating: "7.0/10" },
        { name: "Train to Busan", year: "2016", rating: "7.6/10" },
        { name: "28 Days Later", year: "2002", rating: "7.6/10" },
        { name: "Zombieland", year: "2009", rating: "7.6/10" },
        { name: "Army of the Dead", year: "2021", rating: "5.8/10" },
        { name: "I Am Legend", year: "2007", rating: "7.2/10" },
        { name: "Dawn of the Dead", year: "2004", rating: "7.3/10" },
        { name: "Peninsula", year: "2020", rating: "5.5/10" },
        { name: "Resident Evil", year: "2002", rating: "6.6/10" },
        { name: "#Alive", year: "2020", rating: "6.3/10" },
        { name: "The Girl with All the Gifts", year: "2016", rating: "6.6/10" },
        { name: "Night of the Living Dead", year: "1968", rating: "7.8/10" },
        { name: "Warm Bodies", year: "2013", rating: "6.8/10" },
        { name: "The Return of the Living Dead", year: "1985", rating: "7.2/10" },
        { name: "Day of the Dead", year: "1985", rating: "7.1/10" },
        { name: "Black Summer", year: "2019", rating: "6.6/10" },
        { name: "Ravenous", year: "2017", rating: "6.0/10" },
        { name: "The Dead Don't Die", year: "2019", rating: "5.5/10" },
        { name: "Kingdom", year: "2019", rating: "8.4/10" },
        { name: "REC", year: "2007", rating: "7.4/10" }
        // يمكنك إضافة المزيد من أفلام الزومبي هنا
    ];

    const horrorMovies = [
        { name: "The Conjuring", year: "2013", rating: "7.5/10" },
        { name: "Hereditary", year: "2018", rating: "7.3/10" },
        { name: "A Quiet Place", year: "2018", rating: "7.5/10" },
        { name: "The Babadook", year: "2014", rating: "6.8/10" },
        { name: "Get Out", year: "2017", rating: "7.7/10" },
        { name: "It", year: "2017", rating: "7.3/10" },
        { name: "The Shining", year: "1980", rating: "8.4/10" },
        { name: "Alien", year: "1979", rating: "8.4/10" },
        { name: "The Thing", year: "1982", rating: "8.1/10" },
        { name: "Saw", year: "2004", rating: "7.6/10" },
        { name: "Insidious", year: "2010", rating: "6.8/10" },
        { name: "The Exorcist", year: "1973", rating: "8.0/10" },
        { name: "Sinister", year: "2012", rating: "6.8/10" },
        { name: "Midsommar", year: "2019", rating: "7.1/10" },
        { name: "The Witch", year: "2015", rating: "6.9/10" },
        { name: "Don't Breathe", year: "2016", rating: "7.1/10" },
        { name: "Bird Box", year: "2018", rating: "6.6/10" },
        { name: "The Ring", year: "2002", rating: "7.1/10" },
        { name: "Us", year: "2019", rating: "6.8/10" },
        { name: "The Grudge", year: "2004", rating: "5.9/10" }
        // يمكنك إضافة المزيد من أفلام الرعب هنا
    ];

    const actionMovies = [
        { name: "John Wick", year: "2014", rating: "7.4/10" },
        { name: "Mad Max: Fury Road", year: "2015", rating: "8.1/10" },
        { name: "The Dark Knight", year: "2008", rating: "9.0/10" },
        { name: "Inception", year: "2010", rating: "8.8/10" },
        { name: "Mission: Impossible", year: "1996", rating: "7.1/10" },
        { name: "Die Hard", year: "1988", rating: "8.2/10" },
        { name: "The Matrix", year: "1999", rating: "8.7/10" },
        { name: "Gladiator", year: "2000", rating: "8.5/10" },
        { name: "Casino Royale", year: "2006", rating: "8.0/10" },
        { name: "Edge of Tomorrow", year: "2014", rating: "7.9/10" },
        { name: "Avengers: Endgame", year: "2019", rating: "8.4/10" },
        { name: "Top Gun: Maverick", year: "2022", rating: "8.3/10" },
        { name: "The Bourne Identity", year: "2002", rating: "7.9/10" },
        { name: "Black Panther", year: "2018", rating: "7.3/10" },
        { name: "The Raid", year: "2011", rating: "7.6/10" },
        { name: "Logan", year: "2017", rating: "8.1/10" },
        { name: "300", year: "2006", rating: "7.6/10" },
        { name: "Skyfall", year: "2012", rating: "7.8/10" },
        { name: "Fast Five", year: "2011", rating: "7.3/10" },
        { name: "Wonder Woman", year: "2017", rating: "7.4/10" }
        // يمكنك إضافة المزيد من أفلام الأكشن هنا
    ];

    const formatMovieList = (movies) => {
        let message = "";
        movies.forEach((movie, index) => {
            message += `${index + 1}. ${movie.name} (${movie.year}) - تقييم: ${movie.rating}\n`;
        });
        return message;
    };

    const handleCommand = (category) => {
        let message = "";
        let emoji = "";

        switch (category.toLowerCase()) {
            case "زومبي":
                emoji = "🧟";
                message = `${emoji} أفضل أفلام الزومبي:\n\n${formatMovieList(zombieMovies)}`;
                break;
            case "رعب":
                emoji = "👻";
                message = `${emoji} أفضل أفلام الرعب:\n\n${formatMovieList(horrorMovies)}`;
                break;
            case "اكشن":
                emoji = "💥";
                message = `${emoji} أفضل أفلام الأكشن:\n\n${formatMovieList(actionMovies)}`;
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
