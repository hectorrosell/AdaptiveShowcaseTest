var dataInfo = [
    {
        id: 0,
        name: "Application",
        list: [],
        size: 0,
        description: "Description text for service Application"
    },
    {
        id: 1,
        name: "Commerce",
        list: [],
        size: 0,
        description: "Description text"

    },
    {
        id: 2,
        name: "Communication",
        list: [],
        size: 0,
        description: "Description text"

    },
    {
        id: 3,
        name: "Data",
        size: 8,
        list: [
            {
                id: 0,
                name: "ICloud",
                size: 0,
                list: [],
                description: "Interface for Managing the Cloud operations"
            },
            {
                id: 1,
                name: "IDataStream",
                size: 0,
                list: [],
                description: "Interface for Managing the DataStream operations"
            },
            {
                id: 2,
                name: "IDatabase",
                size: 9,
                list: [
                    {
                        id: 0,
                        name: "createDatabase",
                        description: "Creates a database on default path",
                        favorite: false
                    },
                    {
                        id: 1,
                        name: "deleteDatabase",
                        description: "Deletes a database on default path",
                        favorite: false
                    },
                    {
                        id: 2,
                        name: "DatabaseTable",
                        description: "create a table on default path",
                        favorite: false
                    },
                    {
                        id: 3,
                        name: "existsDatabase",
                        description: "Checks if databaseTable exists",
                        favorite: false
                    },
                    {
                        id: 4,
                        name: "createTable",
                        description: "Creates a databaseTable inside a database",
                        favorite: false
                    },
                    {
                        id: 5,
                        name: "deleteTable",
                        description: "Deletes a databaseTable inside a database",
                        favorite: false
                    },
                    {
                        id: 6,
                        name: "existsTable",
                        description: "Checks if databaseTable exists",
                        favorite: false
                    },
                    {
                        id: 7,
                        name: "executeSqlStatement",
                        description: "Executes SQL statement",
                        favorite: false
                    },
                    {
                        id: 8,
                        name: "executeSqlTransactions",
                        description: "Executes SQL transaction",
                        favorite: false
                    }
                ],
                description: "Interface for Managing the Cloud operations"

            },
            {
                id: 3,
                name: "IFilePath",
                size: 0,
                list: [],
                description: "Base application for Notification purposes"
            },
            {
                id: 4,
                name: "IFileSystem",
                size: 0,
                list: [],
                description: "Interface for Managing the File System operations"
            },
            {
                id: 5,
                name: "IXML",
                size: 0,
                list: [],
                description: "Interface for Managing the XML operations"
            }
        ],
        description: "Description text"
    },

    {
        id: 4,
        name: "Globalization",
        list: [

            {
                id: 0,
                name: "IGlobalization",
                size: 1,
                list: [
                    {
                        id: 0,
                        name: "getResourceLiteral",
                        description: "Interface for Managing the Cloud operations"
                    }
                ],
                description: "Interface for Managing the Cloud operations"
            }

        ],
        size: 1,
        description: "Description text"
    }
    ,
    {
        id: 5,
        name: "IOS",
        list: [

            {
                id: 0,
                name: "IOS",
                size: 1,
                list: [
                    {
                        id: 0,
                        name: "getOSInfo",
                        description: "Interface for Managing the Cloud operations"
                    }
                ],
                description: "Interface for Managing the Cloud operations"
            }

        ],
        size: 0,
        description: "Description text"
            },
    {
        id: 6,
        name: "Media",
        list: [],
        size: 0,
        description: "Description text"
            },
    {
        id: 7,
        name: "Notification",
        list: [],
        size: 0,
        description: "Description text"
    },
    {
        id: 8,
        name: "PIM",
        list: [

            {
                id: 0,
                name: "Icontact",
                size: 1,
                list: [
                    {
                        id: 0,
                        name: "getContactsForFields",
                        description: "Interface for Managing the Cloud operations"
                    }
                ],
                description: "Interface for Managing the Cloud operations"
            }

        ],
        size: 0,
        description: "Description text"
    }, {
        id: 9,
        name: "Reader",
        list: [],
        size: 0,
        description: "Description text"
            },
    {
        id: 10,
        name: "Security",
        list: [],
        size: 0,
        description: "Description text"
    },
    {
        id: 11,
        name: "Sensor",
        list: [],
        size: 0,
        description: "Description text"
    },
    {
        id: 12,
        name: "Social",
        list: [],
        size: 0,
        description: "Description text"
    }, {
        id: 13,
        name: "System",
        list: [

            {
                id: 0,
                name: "IDevice",
                size: 1,
                list: [
                    {
                        id: 0,
                        name: "ButtonListener",
                        description: "Interface for Managing the Cloud operations"
                    }
                ],
                description: "Interface for Managing the Cloud operations"
            }

        ],
        size: 0,
        description: "Description text"
            },
    {
        id: 14,
        name: "UI",
        list: [],
        size: 0,
        description: "Description text"
    },
    {
        id: 15,
        name: "Util",
        list: [],
        size: 0,
        description: "Description text"
    }
];

var items = {};
items.data = [{
    id: "1",
    title: "0 selected"
    }, {
    id: "2",
    title: "0 selected"
    }, {
    id: "3",
    title: "0 selected"
    }];

items.data = [{
    id: "1",
    title: "Listener 1"
    }, {
    id: "2",
    title: "Listener 2"
    }, {
    id: "3",
    title: "Listener 3"
    }];