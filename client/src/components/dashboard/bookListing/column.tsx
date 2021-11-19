const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }

export const tableColumns = [
  { title: "Book id", field: "id", cellStyle, type: "string" },
  { title: "Book Title", field: "title", cellStyle, type: "string" },
  { title: "Media Type", filtering: false, field: "media_type", cellStyle, type: "string" },
  { title: "Download Count", filtering: false, field: "download_count", cellStyle, type: "string" },
  { title: "Copyright", field: "copyright", cellStyle, type: "string" },
]