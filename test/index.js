const parse = require('..');
const fs = require('fs');
const test = require('tap').test;
const { join } = require('path');

test('should parse apache directory index files', t => {
  const index = fs.readFileSync(join(__dirname, '/fixture/apache-index.html'), 'utf8');

  t.same(parse(index), {
    dir: '/foo/bar',
    files: [
      {
        name: 'folderA/',
        type: 'directory',
        path: '/foo/bar/folderA/',
        description: 'The very first folder',
        size: null,
        lastModified: new Date('25-May-2016 11:53')
      },
      {
        name: 'folderB/',
        type: 'directory',
        path: '/foo/bar/folderB/',
        size: 5662310.4,
        lastModified: new Date('19-May-2016 17:57'),
        description: ''
      },
      {
        name: 'fileA.zip',
        type: 'file',
        path: '/foo/bar/fileA.zip',
        size: 57344,
        lastModified: new Date('28-May-2009 15:09'),
        description: ''
      },
      {
        name: 'fileB.zip',
        type: 'file',
        path: '/foo/bar/fileB.zip',
        size: 662528,
        lastModified: new Date('28-May-2009 17:32'),
        description: ''
      }
    ]
  });
  t.end();
});

test('should parse apache directory index files generated by `document.documentElement.outerHTML`', t => {
  const index = fs.readFileSync(join(__dirname, '/fixture/apache-index-doc-outerhtml.html'), 'utf8');

  t.same(parse(index), {
    dir: '/foo/bar',
    files: [
      {
        name: 'folderA/',
        type: 'directory',
        path: '/foo/bar/folderA/',
        description: 'The very first folder',
        size: null,
        lastModified: new Date('25-May-2016 11:53')
      },
      {
        name: 'folderB/',
        type: 'directory',
        path: '/foo/bar/folderB/',
        size: 5662310.4,
        lastModified: new Date('19-May-2016 17:57'),
        description: ''
      },
      {
        name: 'fileA.zip',
        type: 'file',
        path: '/foo/bar/fileA.zip',
        size: 57344,
        lastModified: new Date('28-May-2009 15:09'),
        description: ''
      },
      {
        name: 'fileB.zip',
        type: 'file',
        path: '/foo/bar/fileB.zip',
        size: 662528,
        lastModified: new Date('28-May-2009 17:32'),
        description: ''
      }
    ]
  });
  t.end();
});

test('should parse apache directory index files (alt format)', t => {
  const index = fs.readFileSync(join(__dirname, '/fixture/apache-index-alt.html'), 'utf8');

  t.same(parse(index), {
    dir: '/foo/bar',
    files: [
      {
        name: 'folderA/',
        type: 'directory',
        path: '/foo/bar/folderA/',
        description: null,
        size: null,
        lastModified: new Date('20-Sep-2016 20:33')
      },
      {
        name: 'folderB/',
        type: 'directory',
        path: '/foo/bar/folderB/',
        size: null,
        lastModified: new Date('20-Sep-2016 20:33'),
        description: null
      },
      {
        name: 'fileA.zip',
        type: 'file',
        path: '/foo/bar/fileA.zip',
        size: 57344,
        lastModified: new Date('05-Sep-2016 20:41'),
        description: null
      },
      {
        name: 'fileB.zip',
        type: 'file',
        path: '/foo/bar/fileB.zip',
        size: 662528,
        lastModified: new Date('06-Sep-2016 06:14'),
        description: null
      }
    ]
  });
  t.end();
});

test('Should parse both absolute and relative URLs', t => {
  const index = fs.readFileSync(join(__dirname, '/fixture/apache-index-absolute-and-relative-urls.html'), 'utf8');

  t.same(parse(index), {
    dir: '/foo/bar',
    files: [
      {
        name: 'subdir-absolute/',
        type: 'directory',
        path: 'https://www.example.org/subdir-absolute/',
        description: '',
        size: null,
        lastModified: new Date('2021-06-30T22:24:50.000Z')
      },
      {
        name: 'subdir-relative/',
        type: 'directory',
        path: '/foo/bar/subdir-relative/',
        size: null,
        lastModified: new Date('2021-06-30T22:24:50.000Z'),
        description: ''
      },
      {
        name: 'subfile-absolute.xml',
        type: 'file',
        path: 'https://www.example.org/subfile-absolute.xml',
        size: 25,
        lastModified: new Date('2021-07-04T16:22:15.000Z'),
        description: ''
      },
      {
        name: 'subfile-relative.xml',
        type: 'file',
        path: '/foo/bar/subfile-relative.xml',
        size: 25,
        lastModified: new Date('2021-07-04T16:22:15.000Z'),
        description: ''
      }
    ]
  });
  t.end();
});
