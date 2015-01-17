(function(root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.DataPage = factory();
  }
}(this, function() {

  function DataPage(totalEntries, entriesPerPage, currentPage, pagesPerPageset) {
    this._totalEntries = ko.observable(totalEntries || 0);
    this._entriesPerPage = ko.observable(entriesPerPage || 10);
    this._currentPage = ko.observable(currentPage || 1);
    this._pagesPerPageset = ko.observable(pagesPerPageset || 10);

    this._totalEntries(parseUnsignedInt(this._totalEntries()));
    this._entriesPerPage(parseVal(this._entriesPerPage()));
    this._currentPage(parseVal(this._currentPage()));
    this._pagesPerPageset(parseVal(this._pagesPerPageset()));


    /*
     * @method totalEntries
     * @param {Number|null}
     */
    this.totalEntries = ko.pureComputed({
      read: function () {
        return this._totalEntries(); 
      },
      write: function (val) {
        if (val !== undefined){
          this._totalEntries(parseUnsignedInt(val));
        }
      },
      owner: this
    });

    /*
     * @method entriesPerPage
     * @param {Number|null}
     */
    this.entriesPerPage = ko.pureComputed({
      read: function () {
        return this._entriesPerPage();
      },
      write: function (val) {
        if (val !== undefined) {
          this._entriesPerPage(parseVal(val));
        }
      },
      owner: this
    });

    /*
     * @method currentPage
     * @param {Number|null}
     */
    this.currentPage = ko.pureComputed({
      read: function () {
        return this._currentPage();
      },
      write: function (val) {
        if (val !== undefined) {
          val = parseVal(val);
          this._currentPage(val);
          if (val > this.lastPage()){
            this._currentPage(this.lastPage());
          }
        }
      },
      owner: this
    });

    /*
     * @method pagesPerPageset
     * @param {Number|null}
     */
    this.pagesPerPageset = ko.pureComputed({
      read: function () {
        return this._pagesPerPageset();
      },
      write: function (val) {
        if (val !== undefined) {
          this._pagesPerPageset(parseVal(val));
          if (this._pagesPerPageset() > this.lastPage()){
            this._pagesPerPageset(this.lastPage());
          }
        }
      },
      owner: this
    });

    /*
     * @method firstPage
     */
    this.firstPage = function() {
      return 1;
    };

    /*
     * @method lastPage
     */
    this.lastPage = ko.pureComputed(function() {
      var pages = this.totalEntries() / this.entriesPerPage();
      var lastPage;
      if (pages == parseInt(pages)) {
        lastPage = pages;
      } else {
        lastPage = 1 + parseInt(pages);
      }
      if (lastPage < 1)
        lastPage = 1;
      return lastPage;
    }, this);

    /*
     * @method entriesOnThisPage
     */
    this.entriesOnThisPage = ko.pureComputed(function() {
      if (this.totalEntries() === 0) {
        return 0;
      } else {
        return this.last() - this.first() + 1; //
      }
    }, this);

    /*
     * @method last
     */
    this.last = ko.pureComputed(function() {
      if (this.currentPage() == this.lastPage()) {
        return this.totalEntries();
      } else {
        return (this.currentPage() * this.entriesPerPage());
      }
    }, this);

    /*
     * @method first
     */
    this.first = ko.pureComputed(function() {
      if (this.totalEntries() === 0) {
        return 0;
      } else {
        return ((this.currentPage() - 1) * this.entriesPerPage()) + 1;
      }
    }, this);

    /*
     * @method previousPage
     */
    this.previousPage = ko.pureComputed(function() {
      if (this.currentPage() > 1) {
        return this.currentPage() - 1;
      } else {
        return;
      }
    }, this);

    /*
     * @method nextPage
     */
    this.nextPage = ko.pureComputed(function() {
      return this.currentPage() < this.lastPage() ? this.currentPage() + 1 : undefined;
    }, this);


    /*
     * @method pageset
     * @param {Number|null}
     */
    this.pageset = ko.pureComputed(function() {
      var pageAll = [];
      var page_set = [];
      var i;
      var spliceStart = 0;
      var len = this.pagesPerPageset();

      for (i = this.firstPage(); i <= this.lastPage(); i++) {
        pageAll.push(i);
      }
      if (this.currentPage() > parseInt(len / 2)) {
        spliceStart = this.currentPage() - parseInt(len / 2) - 1;
      }

      if (this.currentPage() + parseInt(len / 2) > this.lastPage()) {
        spliceStart = this.lastPage() - len;
      }

      if (pageAll.length > len) {
        pageAll = pageAll.splice(spliceStart, len);
      }

      return pageAll;
    }, this);

    /*
     * @method hasNextPageset
     */
    this.hasNextPageset = ko.pureComputed(function() {
      return (this.pageset()[this.pagesPerPageset() - 1] !== this.lastPage());
    }, this);

    /*
     * @method hasPreviousPageset
     */
    this.hasPreviousPageset = ko.pureComputed(function() {
      return (this.firstPage() !== this.pageset()[0]);
    }, this);

  }

  function parseVal(val) {
    val = parseInt(val);
    if (typeof val !== 'number' || isNaN(val)) {
      throw new Error('no number');
    }
    if (val < 1) {
      throw new Error('no int');
    }
    return val;
  }

  function parseUnsignedInt(val) {
    val = parseInt(val);
    if (typeof val !== 'number' || isNaN(val))
      throw new Error('no number');
    return val;
  }

  return DataPage;
}));
