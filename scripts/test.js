aaa = {
    "key1" : 10,
    "key2" : 20,
}

bbb = {
    "key3" : 15,
    "key4" : 25,
}

ccc = {...aaa, ...bbb};

//alert(ccc.key1 + " " + ccc["key2"] + " " + ccc.key3 + " " + ccc.key4)