import React, { useState, useEffect } from "react";

// chromeのbookmarkが保存してあるmac内のファイルパス
const bookmarkFilePath =
  "/Users/taiki/Library/ApplicationSupport/Google/Chrome/Default/Bookmarks";

export default function BookMarks() {
  const [bookmarksArray, setBookmarks] = useState([]);

  const getFileData = event => {
    console.log(event.target.files);
    let reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      function folderDisassembly(obj) {
        if (obj.type === "folder") obj.children.map(c => folderDisassembly(c));
        else {
          bookmarks.push({ name: obj.name, url: obj.url });
        }
      }
      const bookmarksNode = JSON.parse(reader.result).roots.bookmark_bar
        .children;
      const bookmarks = [];
      bookmarksNode.map(b => folderDisassembly(b));
      setBookmarks(bookmarks);
    };
  };

  return (
    <div>
      <input type="file" onChange={e => getFileData(e)} />
      <ul>
        {bookmarksArray.map((obj, index) => (
          <li key={index}>
            <a href={obj.url}>{obj.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
