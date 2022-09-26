const projectColumns = () => [
  {
    dataField: "id",
    text: "#",
    sort: true,
  },
  {
    dataField: "produit.name",
    text: "Name",
    sort: true,
  },
  {
    dataField: "date_created",
    text: "Date",
    sort: true,
  },
  {
    dataField: "location.name",
    text: "Emplacement",
    sort: true,
  },
  {
    dataField: "serial_number",
    text: "Serial Number",
    sort: true,
  },
]

export default projectColumns
