#!/usr/bin/python3
"""
    Basic dictionary
"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """
        a FirstInFirstOout caching system
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
            if valuecache is None:
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    keydel = list(self.cache_data.keys())[0]
                    del self.cache_data[keydel]
                    print("DISCARD: {}".format(keydel))

            self.cache_data[key] = item

    def get(self, key):
        """
            Get an item by key from cache data

            Args:
                key: identifies the cache data

            Return:
                value of the key
        """
        if key or self.cache_data.get(key) is not None:
            valuecache = self.cache_data.get(key)
            return valuecache

        return None
