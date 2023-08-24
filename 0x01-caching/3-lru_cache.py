#!/usr/bin/python3
"""
    LRU Caching System
"""

from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """
        a LRU caching system
        Arg;
            BaseCaching - use self.cache_data - dictionary from the parent
            class BaseCaching
    """
    def __init__(self):
        """ Initiliaze
        """
        super().__init__()

    def put(self, key, item):
        """
            Add an item to cache data

            Args:
                key: of the dict
                item: value of the key
        """
        if key or item is not None:
            valuecache = self.get(key)
            # Make a new
            if valuecache is None:
                if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                    keydel = self.leastrecent
                    lendel = len(keydel) - 1
                    del self.cache_data[keydel[lendel]]
                    print("DISCARD: {}".format(self.leastrecent.pop()))
            else:
                del self.cache_data[key]

            if key in self.leastrecent:
                self.leastrecent.remove(key)
                self.leastrecent.insert(0, key)
            else:
                self.leastrecent.insert(0, key)

            self.cache_data[key] = item

    def get(self, key):
        """
            Get an item by key from cache data

            Args:
                key: identifies the cache data

            Return:
                value of the key
        """
        valuecache = self.cache_data.get(key)

        if valuecache:
            self.leastrecent.remove(key)
            self.leastrecent.insert(0, key)

        return valuecache
