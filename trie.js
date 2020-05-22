class TrieNode {
    constructor() {
        this.children = {}; // key: string, value: TrieNode
        this.terminal = false; // means that it itself is a "word" inspite of maybe being a suffix, too
    }

    markTerminal() {
        this.terminal = true;
    }

    // https://stackoverflow.com/a/59787784
    isEmptyObject(obj) {
        for(var i in obj) return false; 
        return true;        
    }

    hasNoChildren() {
        return this.isEmptyObject(this.children);
    }

    hasChildren() {
        return !this.hasNoChildren();
    }

    addChildValue(str, depth) {
        if (str.length === depth) {
            if (str) this.markTerminal();
            return;
        }

        var childVal = str.slice(0, depth + 1);
        var child = this.children[childVal] || (this.children[childVal] = new TrieNode());
        child.addChildValue(str, depth + 1);
    }

    fetchChildren(str, depth, collectedChildren) {
        var childValue = str.slice(0, depth + 1);
        var child = this.children[childValue];

        if (!child) return;
        if (child.terminal && str.length <= childValue.length) {
            collectedChildren.push(childValue)
        }

        for (var childValue in child.children) {
            var childNode = child.children[childValue];

            if (childNode.terminal && str.length <= childValue.length) {
                if (str.length !== childValue.length || str[str.length - 1] === childValue[childValue.length - 1]) {
                    collectedChildren.push(childValue)
                }
            }

            childNode.fetchAllChildren(collectedChildren);
        }
    }

    fetchAllChildren(collectedChildren) {
        for (var childValue in this.children) {
            var child = this.children[childValue]
            if (child.terminal) {
                collectedChildren.push(childValue)
            }
            child.fetchAllChildren(collectedChildren)
        }
    }
}

class Trie {
    constructor() {
        this.rootNode = new TrieNode();
    }

    insertTrieValue(value) {
        this.rootNode.addChildValue(value, 0);
    }

    fetchMatches(value) {
        var values = [];
        this.rootNode.fetchChildren(value, 0, values);
        return values;
    }
}

var t = new Trie();
t.insertTrieValue('a');
assert(t.fetchMatches('a').join('') === 'a', "trie with one ancestor");

var t = new Trie();
t.insertTrieValue('ar');
assert(t.fetchMatches('ar').join('') === 'ar', "trie with two ancestors full-lookup");

var t = new Trie();
t.insertTrieValue('ar');
assert(t.fetchMatches('a').join('') === 'ar', "trie with two ancestors sub-lookup");

var t = new Trie();
t.insertTrieValue('aryeh')
assert(t.fetchMatches('a').join('') === 'aryeh', "trie with a lot of ancestors sub-lookup len 1");

var t = new Trie();
t.insertTrieValue('aryeh')
assert(t.fetchMatches('ar').join('') === 'aryeh', "trie with a lot of ancestors sub-lookup len 2");

var t = new Trie();
t.insertTrieValue('aryeh')
assert(t.fetchMatches('ary').join('') === 'aryeh', "trie with a lot of ancestors sub-lookup len 3");

var t = new Trie();
t.insertTrieValue('a')
t.insertTrieValue('ab')
t.insertTrieValue('abc')
assert(t.fetchMatches('a').join(',') === 'a,ab,abc')

var t = new Trie();
t.insertTrieValue('a')
t.insertTrieValue('ab')
t.insertTrieValue('abc')
assert(t.fetchMatches('ab').join(',') === 'ab,abc')

var t = new Trie();
t.insertTrieValue('a')
t.insertTrieValue('ab')
t.insertTrieValue('abc')
assert(t.fetchMatches('abc').join(',') === 'abc')

var t = new Trie();
t.insertTrieValue('a')
t.insertTrieValue('ab')
t.insertTrieValue('abc')
t.insertTrieValue('abcdefg')
assert(t.fetchMatches('abc').join(',') === 'abc,abcdefg')

var t = new Trie();
t.insertTrieValue('xyz');
t.insertTrieValue('abc');
assert(t.fetchMatches('a').join(',') === 'abc') 

var t = new Trie();
['to', 'tea', 'ted', 'ten', 'in', 'inn', 'A'].forEach((word) => { t.insertTrieValue(word); })
assert(t.fetchMatches('A').join(',') === 'A');
assert(t.fetchMatches('t').join(',') === 'to,tea,ted,ten');
assert(t.fetchMatches('te').join(',') === 'tea,ted,ten');
assert(t.fetchMatches('i').join(',') === 'in,inn');
assert(t.fetchMatches('in').join(',') === 'in,inn');

var t = new Trie();
t.insertTrieValue('tea');
t.insertTrieValue('to');
t.fetchMatches('te')
assert(t.fetchMatches('te').join('') === 'tea')
