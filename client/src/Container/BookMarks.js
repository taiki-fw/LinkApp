// import React from "react";
const fs = require("fs");

function folderDisassembly(obj) {
  if (obj.type === "folder") obj.children.map(c => folderDisassembly(c));
  else {
    bookmarks.push({ name: obj.name, url: obj.url });
  }
}

const bookmarkFile = fs.readFileSync(
  "/Users/taiki/Library/ApplicationSupport/Google/Chrome/Default/Bookmarks"
); // chromeのbookmarkが保存してあるmac内のファイルパス
const bookmarksNode = JSON.parse(bookmarkFile).roots.bookmark_bar.children;
const bookmarks = [];
bookmarksNode.map(b => folderDisassembly(b));
console.log(bookmarks);

// export default function BookMarks() {

//   return <h1>Hello BookMarks</h1>;
// }
