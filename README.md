Knockout-DataPage.js - Simple Pagenation Data Object for Knockout.js
==================================================

[![Build Status](https://travis-ci.org/trapple/knockout-datapagejs.svg?branch=master)](https://travis-ci.org/trapple/knockout-datapagejs) fork of DataPage.js

SYNOPSIS
--------------------------------------

```
var pager = new DataPage(totalEntries, entriesPerPage, currentPage, pagesPerPageset);
pager.firstPage();
pager.lastPage();
pager.first();
pager.last();

pager.pageset() // 1,2,3,4,5...


// default value
// totalEntries || 0
// entriesPerPage || 10
// currentPage || 1
// pagesPerPageset || 10

```

INSTALL
--------------------------------------

### Node

```
$ npm install knockout-datapage
```

Then:

```
var DataPage = require('knockout-datapage');
```

### Browser

```
bower install knockout-datapage
```
Then:

```
<script src="knockout-datapage.js"></script>
```

METHODS
--------------------------------------
### new

```
new DataPage();
new DataPage(totalEntries, entriesPerPage, currentPage, pagesPerPageset);
// default value
// totalEntries || 0
// entriesPerPage || 10
// currentPage || 1
// pagesPerPageset || 10

```

### entriesPerPage
sets or gets the total number of entries per page (which defaults 10)

```
// set
pager.entriesPerPage(15);
// get
pager.entriesPerPage();
```

### currentPage
```
// set
pager.currentPage(2);
// get
pager.currentPage();
```

### totalEntries ( set | get )

```
// set
pager.totalEntries(300);
// get
pager.pager.totalEntries();
```

### entriesOnThisPage

```
var totalEntries = 300,
	entriesPerPage = 10,
	currentPage = 2,
	pagesPerPageset = 5;
var pager = new DataPage(totalEntries, entriesPerPage, currentPage, pagesPerPageset);
pager.entriesOnThisPage(); // returns 10
```

```
var totalEntries = 317,
	entriesPerPage = 10,
	currentPage = 32,
	pagesPerPageset = 5;
var pager = new DataPage(totalEntries, entriesPerPage, currentPage, pagesPerPageset);
pager.entriesOnThisPage(); // returns 7
```

### firstPage

always returns 1

### lastPage

```
var pager = new DataPage(500, 30, 1); 
pager.lastPage(); returns 17
```

### fast

### last

### previousPage

### nextPage

### pagesPerPageset ( set | get )

### pageset

### hasNextPageset

### hasPreviousPageset

COPYRIGHT
--------------------------------------
&copy; 2014 trapple


LICENSE
--------------------------------------
The "Artistic License"

