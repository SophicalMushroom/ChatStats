debugMode = True  # set true to run locally with flask debug enabled
config = {
    "baseURL": "/api/v1",
    "debugMode": debugMode,
    "rootDataDir": "C:/Users/ditta/Documents/Code/inbox",
    "sentimentModelPath": "src/sentimentClassifier/MultinomialNB_Sklearn_Accuracy76.pkl",
    "dbConfig": {
        "connectionStr": "mongodb+srv://chatstatsadmin:BgOXkdIpyXrtZtHN@cluster0.iosd4.mongodb.net/chatstatsdb?retryWrites=true&w=majority",
        "dbName": "chatstatsdb",
    },
    "cacheConfig": {
        "CACHE_TYPE": "simple",
        "CACHE_DEFAULT_TIMEOUT": 300,  # in seconds
        "DEBUG": debugMode
    },
}
