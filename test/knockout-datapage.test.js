var assert = require('power-assert');
global.ko = require('knockout');
var DataPage = require('../src/knockout-datapage.js');

describe("DataPage", function() {
  it('no args', function() {
    var pager = new DataPage();
    assert.equal(pager.totalEntries(), 0);
    assert.equal(pager.entriesPerPage(), 10);
    assert.equal(pager.currentPage(), 1);
  });

  it('set invalid args', function() {
    assert.throws(function() {
      var pager = new DataPage("foo", 20, 5, 10);
    }, /no number/);
    assert.throws(function() {
      var pager = new DataPage(300, "bar", 5, 10);
    }, /no number/);
    assert.throws(function() {
      var pager = new DataPage(300, 20, "baz", 10);
    }, /no number/);
    assert.throws(function() {
      var pager = new DataPage(300, 20, 5, "fizz");
    }, /no number/);
  });

  it('set invalid number but can parseInt', function() {
    var pager = new DataPage("500", "20", "3", "5");
    assert.equal(pager.totalEntries(), 500);
    assert.equal(pager.entriesPerPage(), 20);
    assert.equal(pager.currentPage(), 3);
    assert.equal(pager.pagesPerPageset(), 5);
  });

  it('entriesPerPage', function() {
    var pager = new DataPage();
    pager.entriesPerPage(5);
    assert.equal(pager.entriesPerPage(), 5);

    pager.entriesPerPage(3.5);
    assert.equal(pager.entriesPerPage(), 3);

    pager.entriesPerPage("5");
    assert.equal(pager.entriesPerPage(), 5);

    assert.throws(function() {
      pager.entriesPerPage(0)
    }, /no int/);
    assert.throws(function() {
      pager.entriesPerPage('hoge')
    }, /no number/);
  });

  it('currentPage', function() {
    var pager = new DataPage();
    pager.totalEntries(100);
    pager.entriesPerPage(20);

    pager.currentPage(2);
    assert.equal(pager.currentPage(), 2);

    pager.currentPage("2");
    assert.equal(pager.currentPage(), 2);

    pager.entriesPerPage(20);
    pager.currentPage(6);
    assert.equal(pager.currentPage(), 5);

    pager.currentPage(4.5);
    assert.equal(pager.currentPage(), 4);
    assert.throws(function() {
      pager.currentPage(0)
    }, /no int/);
    assert.throws(function() {
      pager.currentPage('hoge')
    }, /no number/);
  });

  it('totalEntries', function() {
    var pager = new DataPage();
    pager.totalEntries(400);
    assert.equal(pager.totalEntries(), 400);

    pager.totalEntries(4.5);
    assert.equal(pager.totalEntries(), 4);

    pager.totalEntries("400");
    assert.equal(pager.totalEntries(), 400);

    pager.totalEntries(0);
    assert.equal(pager.totalEntries(), 0);
    assert.throws(function() {
      pager.totalEntries('fuga')
    }, /no number/);
  });

  it('entriesOnThisPage', function() {
    var totalEntries = 315,
      entriesPerPage = 10,
      currentPage = 2,
      pagesPerPageset = 5;
    var pager = new DataPage(totalEntries, entriesPerPage, currentPage, pagesPerPageset);
    assert.equal(pager.entriesOnThisPage(), 10);
  });

  it('entriesOnThisPage with lastpage', function() {
    var totalEntries = 315,
      entriesPerPage = 10,
      currentPage = 32,
      pagesPerPageset = 5;
    var pager = new DataPage(totalEntries, entriesPerPage, currentPage, pagesPerPageset);
    assert.equal(pager.entriesOnThisPage(), 5);
  });

  it('firstPage', function() {
    var pager = new DataPage();
    assert.equal(pager.firstPage(), 1);
  });

  it('lastPage', function() {
    var pager = new DataPage(500, 30, 1);
    assert.equal(pager.lastPage(), 17);

    pager.totalEntries(600);
    pager.entriesPerPage(30);
    assert.equal(pager.lastPage(), 20);

    pager.totalEntries(0);
    pager.entriesPerPage(30);
    assert.equal(pager.lastPage(), 1);

    pager.totalEntries(3);
    pager.entriesPerPage(30);
    assert.equal(pager.lastPage(), 1);
  });

  it('first', function() {
    var pager = new DataPage();
    pager.totalEntries(0);
    assert.equal(pager.first(), 0);

    pager.totalEntries(335);
    pager.entriesPerPage(30);
    pager.currentPage(1);
    assert.equal(pager.first(), 1);

    pager.currentPage(2);
    assert.equal(pager.first(), 31);

    pager.currentPage(12);
    assert.equal(pager.first(), 331);
  });

  it('last', function() {
    var pager = new DataPage();
    pager.totalEntries(0);
    assert.equal(pager.last(), 0);

    pager.totalEntries(335);
    pager.entriesPerPage(30);
    pager.currentPage(1);
    assert.equal(pager.last(), 30);

    pager.currentPage(2);
    assert(pager.last(), 60);

    pager.currentPage(12);
    assert.equal(pager.last(), 335);
  });

  it('previousPage', function() {
    var pager = new DataPage();
    pager.totalEntries(300);
    pager.entriesPerPage(15);
    pager.currentPage(5);
    assert(pager.previousPage() === 4);

    pager.currentPage(1);
    assert(pager.previousPage() === undefined);
  });

  it('nextPage', function() {
    var pager = new DataPage();
    pager.totalEntries(50);
    pager.entriesPerPage(25);
    pager.currentPage(2);
    assert(pager.nextPage() === undefined);

    pager.currentPage(1);
    assert(pager.nextPage() === 2);
  });

  it('pagesPerPageset', function() {
    var pager = new DataPage();
    pager.totalEntries(500);
    pager.entriesPerPage(5);
    pager.currentPage(15);
    pager.pagesPerPageset(10);
    assert(pager.pagesPerPageset() === 10);

    pager.pagesPerPageset(100);
    assert(pager.pagesPerPageset() === 100);

    pager.pagesPerPageset(101);
    assert(pager.pagesPerPageset() === 100);

    pager.pagesPerPageset("5");
    assert(pager.pagesPerPageset() === 5);
  });

  it('pageset', function() {
    var pager = new DataPage();
    pager.totalEntries(500);
    pager.entriesPerPage(5);
    pager.pagesPerPageset(10);
    pager.currentPage(1);
    assert.deepEqual(pager.pageset(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    pager.currentPage(2);
    assert.deepEqual(pager.pageset(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    pager.currentPage(3);
    assert.deepEqual(pager.pageset(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    pager.currentPage(4);
    assert.deepEqual(pager.pageset(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    pager.currentPage(5);
    assert.deepEqual(pager.pageset(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    pager.currentPage(6);
    assert.deepEqual(pager.pageset(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    pager.currentPage(7);
    assert.deepEqual(pager.pageset(), [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    pager.currentPage(100);
    assert.deepEqual(pager.pageset(), [91, 92, 93, 94, 95, 96, 97, 98, 99, 100]);
    pager.currentPage(96);
    assert.deepEqual(pager.pageset(), [91, 92, 93, 94, 95, 96, 97, 98, 99, 100]);
    pager.currentPage(95);
    assert.deepEqual(pager.pageset(), [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]);
    pager.currentPage(94);
    assert.deepEqual(pager.pageset(), [89, 90, 91, 92, 93, 94, 95, 96, 97, 98]);
  });

  it('hasNextPageset', function() {
    var pager = new DataPage();
    pager.totalEntries(500);
    pager.entriesPerPage(5);
    pager.pagesPerPageset(10);
    pager.currentPage(100);
    assert(pager.hasNextPageset() === false);
    pager.currentPage(95);
    assert(pager.hasNextPageset() === true);
  });

  it('hasPreviousPageset', function() {
    var pager = new DataPage();
    pager.totalEntries(500);
    pager.entriesPerPage(5);
    pager.pagesPerPageset(10);
    pager.currentPage(7);
    assert(pager.hasPreviousPageset() === true);
    pager.currentPage(6);
    assert(pager.hasPreviousPageset() === false);

  });

  it('change value', function() {
    var pager = new DataPage();
    assert.equal(pager.totalEntries(), 0);
    assert.equal(pager.entriesPerPage(), 10);
    assert.equal(pager.currentPage(), 1);
    assert.equal(pager.lastPage(), 1);
    assert.equal(pager.pagesPerPageset(), 1);

    pager.pagesPerPageset(5);
    assert.equal(pager.totalEntries(), 0);
    assert.equal(pager.entriesPerPage(), 10);
    assert.equal(pager.currentPage(), 1);
    assert.equal(pager.pagesPerPageset(), 1);

    pager.totalEntries(500);
    assert.equal(pager.pagesPerPageset(), 5);
    assert.deepEqual(pager.pageset(), [1, 2, 3, 4, 5]);

    pager.pagesPerPageset(3);
    assert.equal(pager.pagesPerPageset(), 3);
    assert.deepEqual(pager.pageset(), [1, 2, 3]);

    pager.currentPage(3);
    assert.equal(pager.currentPage(), 3);
    assert.equal(pager.pagesPerPageset(), 3);
    assert.deepEqual(pager.pageset(), [2, 3, 4]);

  });
});
