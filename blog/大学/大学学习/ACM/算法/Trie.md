# [Trie](https://leetcode-cn.com/problems/implement-trie-prefix-tree/solution/trie-tree-de-shi-xian-gua-he-chu-xue-zhe-by-huwt/)

- 字符串检索：事先将已知的一些字符串（字典）的有关信息保存到 Trie 里，查找另外一些未知字符串是否出现过或者出现频率。
- 字符串最长公共前缀：Trie 利用多个字符串的公共前缀来节省存储空间，反之，当我们把大量字符串存储到一棵 Trie 上时，我们可以快速得到某些字符串的公共前缀。
- 排序：Trie 树是一棵多叉树，只要先序遍历整棵树，输出相应的字符串，便是按字典序排序的结果。
作为其他数据结构和算法的辅助结构：如后缀树，AC自动机等。

## 介绍 Trie

Trie 是一颗非典型的多叉树模型，多叉好理解，即每个结点的分支数量可能为多个。

为什么说非典型呢？因为它和一般的多叉树不一样，尤其在结点的数据结构设计上，比如一般的多叉树的结点是这样的：

```cpp
struct TreeNode {
    VALUETYPE value;    //结点值
    TreeNode* children[NUM];    //指向孩子结点
};
```


而 Trie 的结点是这样的(假设只包含'a'~'z'中的字符)：

```cpp
struct TrieNode {
    bool isEnd; //该结点是否是一个串的结束
    TrieNode* next[26]; //字母映射表
};
```


要想学会 Trie 就得先明白它的结点设计。我们可以看到`TrieNode`结点中并没有直接保存字符值的数据成员，那它是怎么保存字符的呢？

这时**字母映射表**`next` 的妙用就体现了，`TrieNode* next[26]`中保存了对当前结点而言下一个可能出现的所有字符的链接，因此我们可以通过一个父结点来预知它所有子结点的值：

```cpp
for (int i = 0; i < 26; i++) {
    char ch = 'a' + i;
    if (parentNode->next[i] == NULL) {
        说明父结点的后一个字母不可为 ch
    } else {
        说明父结点的后一个字母可以是 ch
    }
}
```

### 想象以下，包含三个单词"`sea`","`sells`","`she`"的 **Trie** 会长啥样呢？

它的真实情况是这样的：![来自算法4](../../../../../Markdown_Notes/#ImageAssets/e3c98484881bd654daa8419bcb0791a2b6f8288b58ef50df70ddaeefc4084f48-file_1575215107950)

Trie 中一般都含有大量的空链接，因此在绘制一棵单词查找树时一般会忽略空链接，同时为了方便理解我们可以画成这样：

![实际并非如此，但我们仍可这样理解](../../../../../Markdown_Notes/#ImageAssets/3a0be6938b0a5945695fcddd29c74aacc7ac30f040f5078feefab65339176058-file_1575215106942)

接下来我们一起来实现对 Trie 的一些常用操作方法。

## 定义类 Trie

```cpp
class Trie {
private:
    bool isEnd;
    Trie* next[26];
public:
    //方法将在下文实现...
};
```

## 插入

描述：向 Trie 中插入一个单词 word

实现：这个操作和构建链表很像。首先从根结点的子结点开始与 word 第一个字符进行匹配，一直匹配到前缀链上没有对应的字符，这时开始不断开辟新的结点，直到插入完 word 的最后一个字符，同时还要将最后一个结点`isEnd = true;`，表示它是一个单词的末尾。

```cpp
void insert(string word) {
    Trie* node = this;
    for (char c : word) {
        if (node->next[c-'a'] == NULL) {
            node->next[c-'a'] = new Trie();
        }
        node = node->next[c-'a'];
    }
    node->isEnd = true;
}
```

## 查找

描述：查找 Trie 中是否存在单词 word

实现：从根结点的子结点开始，一直向下匹配即可，如果出现结点值为空就返回`false`，如果匹配到了最后一个字符，那我们只需判断`node->isEnd`即可。

```cpp
bool search(string word) {
    Trie* node = this;
    for (char c : word) {
        node = node->next[c - 'a'];
        if (node == NULL) {
            return false;
        }
    }
    return node->isEnd;
}
```

## 前缀匹配

描述：判断 Trie 中是或有以 prefix 为前缀的单词

实现：和 search 操作类似，只是不需要判断最后一个字符结点的`isEnd`，因为既然能匹配到最后一个字符，那后面一定有单词是以它为前缀的。

```cpp
bool startsWith(string prefix) {
    Trie* node = this;
    for (char c : prefix) {
        node = node->next[c-'a'];
        if (node == NULL) {
            return false;
        }
    }
    return true;
}
```


到这我们就已经实现了对 Trie 的一些基本操作，这样我们对 Trie 就有了进一步的理解。完整代码我贴在了文末。

## 总结

通过以上介绍和代码实现我们可以总结出 ==Trie== 的几点性质：

Trie 的形状和单词的插入或删除顺序无关，也就是说对于任意给定的一组单词，Trie 的形状都是唯一的。

查找或插入一个长度为 L 的单词，访问 next 数组的次数最多为 $L+1$，和 **Trie 中包含多少个单词无关**。

Trie 的每个结点中都保留着一个字母表，这是很耗费空间的。如果 Trie 的高度为 $n$，字母表的大小为 $m$，最坏的情况是 Trie 中还不存在前缀相同的单词，那空间复杂度就为 $O(m^n)$。

最后，关于 Trie 的应用场景，希望你能记住 8 个字：**一次建树，多次查询**。

全部代码

```cpp
class Trie {
private:
    bool isEnd;
    Trie* next[26];

public:
    Trie() {
        isEnd = false;
        memset(next, 0, sizeof(next));
    }
    void insert(string word) {
        Trie* node = this;
        for (char c : word) {
            if (node->next[c - 'a'] == NULL) {
                node->next[c - 'a'] = new Trie();
            }
            node = node->next[c - 'a'];
        }
        node->isEnd = true;
    }

    bool search(string word) {
        Trie* node = this;
        for (char c : word) {
            node = node->next[c - 'a'];
            if (node == NULL) {
                return false;
            }
        }
        return node->isEnd;
    }
```

