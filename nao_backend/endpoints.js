module.exports = function (app) {
  app.get("/user/signin", (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Get all user already created'
    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/AllUser" },
        description: 'User created succefully' 
    } */
    /* #swagger.responses[404] = { schema: { error: 'No user exists' }, description: 'No user exists' }*/
  });

  app.get("/user/:name", (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Get user by name'
    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/UserByName" },
        description: 'User created succefully' 
    } */
    /* #swagger.responses[404] = { schema: { error: 'User does not exist' }, description: 'User does not exist' }*/
  });

  app.post("/user/signin", (req, res) => {
    // #swagger.description = 'Create an user'
    // #swagger.tags = ['User']

    /* #swagger.body['username'] = {
	       in: 'query',
               description: 'username',
               type: 'string'
        } */
    /* #swagger.body['email'] = {
	       in: 'query',
               description: 'email',
               type: 'string'
        } */
    /* #swagger.body['password'] = {
	       in: 'query',
               description: 'password',
               type: 'string'
        } */
    const users = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    // #swagger.responses[409] = { schema: { error: 'User already exists' }, description: 'User already exists' }
    /* #swagger.responses[201] = { 
                   schema: { $ref: "#/definitions/User" },
                   description: 'User created succefully' 
            } */
    /* #swagger.responses[500] = { schema: { error: 'Error' }, description: 'Error' }*/
  });

  app.post("/login", (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Get user by name'

    /* #swagger.body['username'] = {
	       in: 'query',
               description: 'username',
               type: 'string'
        } */
    /* #swagger.body['password'] = {
	       in: 'query',
               description: 'password',
               type: 'string'
        } */
    const users = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    // #swagger.responses[409] = { schema: { error: 'User does not exist' }, description: 'User does not exist' }
    // #swagger.responses[201] = { schema: { userName: "Jhon Doe" }, description: 'Login Successfully' }
    /* #swagger.responses[500] = { schema: { error: 'Error' }, description: 'Error' }*/
  });

  app.get("/cards/groupsId/:id", (req, res) => {
    // #swagger.tags = ['Cards']
    // #swagger.description = 'Get all cards of a group'

    const id = request.params.id;
    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/Cards" },
        description: 'Get all cards of a group' 
    } */
    /* #swagger.responses[404] = { schema: { error: 'No cards found' }, description: 'No cards with this groupsId exist' }*/
  });

  app.post("/cards/userId", (req, res) => {
    // #swagger.tags = ['Cards']
    // #swagger.description = 'Create card'

    const users = {
      name: req.body.name,
      groupsId: req.body.groupsId,
    };
    // #swagger.responses[409] = { schema: { error: "Card already exists" }, description: "Card already exist" }
    // #swagger.responses[500] = { schema: { error: "Error creating card" }, description: "Error creating card" }
    // #swagger.responses[201] = { schema: { result: "Created new Card" }, description: 'Created card' }
  });

  app.delete("/cards/delete/:name", (req, res) => {
    // #swagger.tags = ['Cards']
    // #swagger.description = 'Delete card'

    const name = request.params.name;
    // #swagger.responses[409] = { schema: { error: "Card doesnt exists" }, description: "Card doesn't exists" }
    // #swagger.responses[500] = { schema: { error: "Error deleting card" }, description: "Error deleting card" }
    // #swagger.responses[201] = { schema: { result: "Deleted card" }, description: "Deleted card" }
  });

  app.get("/organizations/", (req, res) => {
    // #swagger.tags = ['Organizations']
    // #swagger.description = 'Get all organizations'

    const id = request.params.id;
    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/Organizations" },
        description: 'Get all organizations' 
    } */
    // #swagger.responses[203] = { schema: { result: "No organization exists" }, description: "No organization exists" }
  });

  app.get("/organizations/getUser/:id", (req, res) => {
    // #swagger.tags = ['Organizations']
    // #swagger.description = 'Get all user of an organization'

    const id = request.params.id;
    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/UserOrganization" },
        description: 'All users of an organization'
    } */
    // #swagger.responses[203] = { schema: { result: "Organization dosn't contain any user" }, description: "Organization dosn't contain any user" }
    // #swagger.responses[404] = { schema: { error: "Organization dosn't exist" }, description: "Organization dosn't exist" }
  });

  app.get("/organizations/userOrganisation/:id", (req, res) => {
    // #swagger.tags = ['Organizations']
    // #swagger.description = 'Get all user of an organization'

    const id = request.params.id;
    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/OrganizationUser" },
        description: 'All organization of an user'
    } */
    // #swagger.responses[203] = { schema: { result: "User dosn't have access to any organization" }, description: "User dosn't have access to any organization" }
    // #swagger.responses[404] = { schema: { error: "User dosn't exist" }, description: "User dosn't exist" }
  });

  app.get("/organizations/:name", (req, res) => {
    // #swagger.tags = ['Organizations']
    // #swagger.description = 'Get organization by name'

    const id = request.params.id;
    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/Organizations" },
        description: 'Get organization by name'
    } */
    // #swagger.responses[404] = { schema: { error: "Orga dosn't exists" }, description: "Orga dosn't exists" }
  });

  app.post("/organizations/addOrganization", (req, res) => {
    // #swagger.tags = ['Organizations']
    // #swagger.description = 'Create organization'
    /* #swagger.body['organizationName'] = {
	       in: 'query',
               description: 'organizationName',
               type: 'string'
        } */
    const users = {
      organizationName: req.body.organizationName,
    };
    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/CreateOrga" },
        description: 'Created new Orga'
    } */
    // #swagger.responses[500] = { schema: { error: "Error creating Orga" }, description: "Error creating Orga" }
    // #swagger.responses[409] = { schema: { error: "Orga already exists" }, description: "Orga already exists" }
  });

  app.post("/organizations/addUser", (req, res) => {
    // #swagger.tags = ['Organizations']
    // #swagger.description = 'Add user to an organization'
    /* #swagger.body['userId'] = {
	       in: 'query',
               description: 'userId',
               type: 'Number'
        } */
    /* #swagger.body['organizationId'] = {
	       in: 'query',
               description: 'organizationId',
               type: 'Number'
        } */
    /* #swagger.body['organizationName'] = {
	       in: 'query',
               description: 'organizationName',
               type: 'String'
        } */
    const users = {
      userId: req.body.userId,
      organizationId: req.body.organizationId,
      organizationName: req.body.organizationName,
    };
    // #swagger.responses[201] = { schema: { result: "Created new User" }, description: "Created new User" }
    // #swagger.responses[500] = { schema: { error: "Error deleted User" }, description: "Error deleted User" }
    // #swagger.responses[409] = { schema: { error: "User already exists" }, description: "User already exists" }
  });

  app.delete("/organizations/delete/user", (req, res) => {
    // #swagger.tags = ['Organizations']
    // #swagger.description = 'Add user to an organization'

    /* #swagger.body['userId'] = {
	       in: 'query',
               description: 'userId',
               type: 'Number'
        } */
    /* #swagger.body['organizationId'] = {
	       in: 'query',
               description: 'organizationId',
               type: 'Number'
        } */
    const users = {
      userId: req.body.userId,
      organizationId: req.body.organizationId,
    };
    // #swagger.responses[201] = { schema: { result: "Deleted User" }, description: "Deleted User" }
    // #swagger.responses[500] = { schema: { error: "Error deleted User" }, description: "Error deleted User" }
    // #swagger.responses[404] = { schema: { error: "User dosn't exists" }, description: "User dosn't exists" }
  });

  app.delete("/organizations/delete/:name", (req, res) => {
    // #swagger.tags = ['Organizations']
    // #swagger.description = 'Delete organization'

    const name = request.params.name;
    // #swagger.responses[201] = { schema: { result: "Deleted organization" }, description: "Deleted organization" }
    // #swagger.responses[500] = { schema: { error: "Error deleted Orga" }, description: "Error deleted Orga" }
    // #swagger.responses[404] = { schema: { error: "Organization dosn't exists" }, description: "Organization dosn't exists" }
  });

  app.get("/groups/userId/:id", (req, res) => {
    // #swagger.tags = ['Groups']
    // #swagger.description = 'Get all groups of an organization'

    const id = request.params.id;
    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/Groups" },
        description: 'Get organization by name'
    } */
    // #swagger.responses[203] = { schema: { result: "No groups found" }, description: "No groups found" }
    // #swagger.responses[404] = { schema: { error: "Organization dosn't exists" }, description: "Organization dosn't exists" }
  });

  app.post("/groups/userId/", (req, res) => {
    // #swagger.tags = ['Groups']
    // #swagger.description = 'Create group in organization'

    /* #swagger.body['name'] = {
	       in: 'query',
               description: 'name',
               type: 'string'
        } */
    /* #swagger.body['organizationId'] = {
	       in: 'query',
               description: 'organizationId',
               type: 'Number'
        } */
    const users = {
      name: req.body.name,
      organizationId: req.body.organizationId,
    };
    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/CreateGroup" },
        description: 'Created new Group'
    } */
    // #swagger.responses[409] = { schema: { error: "Organization dosn't exists" }, description: "Organization dosn't exist" }
    // #swagger.responses[500] = { schema: { error: "Error creating Group" }, description: "Error creating Group" }
    // #swagger.responses[405] = { schema: { error: "Group already exists" }, description: "Group already exists" }
  });

  app.delete("/groups/delete/:name", (req, res) => {
    // #swagger.tags = ['Groups']
    // #swagger.description = 'Delete group by name'

    const name = request.params.name;
    // #swagger.responses[201] = { schema: { result: "Deleted group" }, description: "Deleted group" }
    // #swagger.responses[404] = { schema: { error: "Group dosn't exists" }, description: "Group dosn't exists" }
  });
};
