from src import cache
from config import config


defaultTimeout = config["cacheConfig"]["CACHE_DEFAULT_TIMEOUT"]


def executeQuery(query, timeout=defaultTimeout):
  """
  Executes a sql query, caches the results of the query for
  "timeout" number of seconds

  @param <query:string>: String representation of the sql query
  @param <timeout:int>: Number of seconds to cache query results

  @return <pandas.DataFrame>: Pandas dataframe containg the query results
  """
  @cache.memoize(timeout=timeout)
  def executeQueryHelper(query):
    print("Cache miss")
 
  return executeQueryHelper(query)
