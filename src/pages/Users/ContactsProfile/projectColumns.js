const projectColumns = () => [
  {
    dataField: "id",
    text: "#",
    sort: true,
  },
  {
    dataField: "fullname",
    text: "Name",
    sort: true,
  },
  {
    dataField: "email",
    text: "Email",
    sort: true,
  },
  {
    dataField: "groups.name",
    text: "Group",
    sort: true,
  },
  {
    dataField: "is_active",
    text: "Status",
    sort: true,
  },
]

export default projectColumns
