import pytest
from calculator import safe_divide

def test_normal_division():
    assert safe_divide(10, 2) == 5.0

def test_rounding():
    assert safe_divide(1, 3) == 0.33

def test_negative():
    assert safe_divide(-9, 3) == -3.0

def test_zero_division():
    assert safe_divide(5, 0) == "Error"

def test_float_input():
    assert safe_divide(5.5, 2) == 2.75
