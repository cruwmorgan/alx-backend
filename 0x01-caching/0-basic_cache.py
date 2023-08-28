#!/usr/bin/python3
"""
    Basic dictionary
"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
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
            self.cache_data[key] = item
        else:
            return

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
