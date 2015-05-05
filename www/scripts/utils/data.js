var dataInfo = [
    {
        id: 0,
        name: "Application",
        list: [],
        size: 0


    },
    {
        id: 1,
        name: "Communication",
        list: [],
        size: 0

    },

    {
        id: 2,
        name: "Data",
        size: 8,
        list: [
            {
                id: 0,
                name: "Database",
                list: [],
                size: 0,
                description: "Structure representing a database reference"

            },
            {
                id: 1,
                name: "DatabaseColumn",
                list: [],
                size: 0,
                description: "Structure representing the column specification"
            },
            {
                id: 2,
                name: "DatabaseRow",
                list: [],
                size: 0,
                description: "Structure representing a row for a data table."
            },
            {
                id: 3,
                name: "DatabaseTable",
                list: [],
                size: 0,
                description: "Represents a data table composed of databaseColumns/databaseRows"
            },
            {
                id: 4,
                name: "IBaseData",
                size: 9,
                list: [
                    {
                        id: 0,
                        name: "createDatabase",
                        description: "Creates a database on default path"
                    },
                    {
                        id: 1,
                        name: "deleteDatabase",
                        description: "Deletes a database on default path"
                    },
                    {
                        id: 2,
                        name: "DatabaseTable",
                        description: "create a table on default path"
                    },
                    {
                        id: 3,
                        name: "existsDatabase",
                        description: "Checks if databaseTable exists"
                    },
                    {
                        id: 4,
                        name: "createTable",
                        description: "Creates a databaseTable inside a database"
                    },
                    {
                        id: 5,
                        name: "deleteTable",
                        description: "Deletes a databaseTable inside a database"
                    },
                    {
                        id: 6,
                        name: "existsTable",
                        description: "Checks if databaseTable exists"
                    },
                    {
                        id: 7,
                        name: "executeSqlStatement",
                        description: "Executes SQL statement"
                    },
                    {
                        id: 8,
                        name: "executeSqlTransactions",
                        description: "Executes SQL transaction"
                    }
                        ],
                description: "Base application for Data purposes"


            },
            {
                id: 5,
                name: "IBaseListener",
                size: 0,
                list: [],
                description: "Base application for Listener purposes"
            },
            {
                id: 6,
                name: "IBaseMedia",
                size: 0,
                list: [],
                description: "Base application for Media purposes"
            },
            {
                id: 7,
                name: "IBaseNotification",
                size: 0,
                list: [],
                description: "Base application for Notification purposes"
            }

        ]
    },

    {
        id: 3,
        name: "Pim",
        list: [],
        size: 0
            },
    {
        id: 4,
        name: "Security",
        list: [],
        size: 0
    },
    {
        id: 5,
        name: "Sensor",
        list: [],
        size: 0
    }
];