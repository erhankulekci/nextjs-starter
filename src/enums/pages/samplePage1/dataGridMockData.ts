export const columns: any = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
        align: "center",
        headerAlign: "center"
    },
    {
        field: "firstName",
        headerName: "First Name",
        width: 150,
        editable: true,
        align: "center",
        headerAlign: "center"
    },
    {
        field: "lastName",
        headerName: "Last Name",
        width: 150,
        editable: true,
        align: "center",
        headerAlign: "center"
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 110,
        editable: true,
        align: "center",
        headerAlign: "center"
    },
    {
        field: "fullName",
        headerName: "Full Name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        minWidth: 160,
        flex: 1,
        valueGetter: (_: any, row: any) => `${row.firstName || ""} ${row.lastName || ""}`,
        align: "center",
        headerAlign: "center"
    }
];

export const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
];

export const testColumns: any = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
        align: "center",
        headerAlign: "center"
    },
    {
        field: "title",
        headerName: "Title",
        width: 250,
        editable: true,
        align: "center",
        headerAlign: "center"
    },
    {
        field: "description",
        headerName: "Description",
        width: 150,
        editable: true,
        align: "center",
        headerAlign: "center",
        flex: 1
    },
    {
        field: "price",
        headerName: "Price",
        type: "number",
        width: 110,
        editable: true,
        align: "center",
        headerAlign: "center"
    }
];
