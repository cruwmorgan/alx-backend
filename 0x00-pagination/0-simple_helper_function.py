#!/usr/bin/env python3
"""function should return a tuple of size two containing a start index and
an end index"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
        Range of the page

        Args:
            page: Current page
            page_size: Total size of the pages

        Return:
             tuple of size two containing a start index and an end index
             corresponding to the range of indexes to return in a list for
             those particular pagination parameters
    """

    final_size: int = page * page_size
    start_size: int = final_size - page_size

    return (start_size, final_size)
