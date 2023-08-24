#!/usr/bin/python3
"""
    MRU Caching system
"""

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """
        a caching system
        Arg;
            BaseCaching - use self.cache_data - dictionary from the parent
            class BaseCaching
    """
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
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    keydel = self.leastrecent
                    lendel = len(keydel) - 1
                    del self.cache_data[keydel[lendel]]
                    print("DISCARD: {}".format(self.leastrecent.pop()))
            else:
                del self.cache_data[key]

            if key in self.leastrecent:
                self.leastrecent.remove(key)
                self.leastrecent.append(key)
            else:
                self.leastrecent.append(key)

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
            if valuecache:
                self.leastrecent.remove(key)
                self.leastrecent.append(key)

            return valuecache

        return None
