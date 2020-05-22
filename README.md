# trie
Just for fun. Simple trie implementation in JS. Saw an implementation in the wild and wondered "how hard would it be to write that myself?" 

## why

tries are faster for certain kinds of lookups -- i.e. autocomplete and finding matches for a given string against a large list of items. More information on [Wikipedia](https://en.wikipedia.org/wiki/Trie)

## usage

```javascript
> var trie = new Trie();
> ['to', 'tea', 'ted', 'ten', 'in', 'inn', 'A'].forEach((word) => { trie.insertTrieValue(word); });
> trie.matches('te')
['tea', 'ted', 'ten']
```

## tests

Handful of primitive tests using `assert` are in the main file

### other

* [ ] TODO: implement exact matches
* [ ] TODO: implement max match (i.e. largest word that matches string)
* [ ] TODO: implement min match (i.e. smallest word that matches string)
* [ ] TODO: implement top longest n matches / top n smallest matches 
* [ ] TODO: check real-world perfomance against

```javascript
var matches = (list, pattern) => { list.filter((elem) => { elem.startsWith(pattern) }) }
```
