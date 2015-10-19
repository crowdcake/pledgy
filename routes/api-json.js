var config = require('../config/config.json');
var db = require('../db/' + config.database.type + '.js');

var express = require('express');
var router = express.Router();
var shuffle = require('shuffle-array');

function rmPledgerNameArr(projectArray) {
    for(var i = 0; i < projectArray.length; i++) {
        rmPledgerName(projectArray[i]);
    }
    return projectArray;
}

function rmPledgerName(project) {
    if (project != undefined && project.pledges != undefined && project.pledges.length < 1) {
        for (var i = 0; i < project.pledges.length; i++) {
            if (project.pledges[i].public == false)
                project.pledges[i].user = 'anonymous';
        }
    }
    return project;
}

/**
 * @api {get} json/projects Get all projects (active & archived)
 * @apiVersion 0.0.1
 * @apiName GetAllProjects
 * @apiGroup JSON
 *
 * @apiSuccess {Object[]} projects Array of projects
 *   @apiSuccess {String} projects.id Project-UID
 *   @apiSuccess {String} projects.name Project name
 *   @apiSuccess {String} projects.subtitle  Short description of the project
 *   @apiSuccess {String} projects.owner Name of project-owner
 *   @apiSuccess {Timestamp} projects.created Project's create-timestamp
 *   @apiSuccess {String} projects.description Longer description of the project's goal
 *   @apiSuccess {Number} projects.goal Project's funding-goal in cents
 *   @apiSuccess {Number} projects.current Project's current funding
 *   @apiSuccess {Object[]} projects.pledges Array of Pledges
 *     @apiSuccess {String} projects.pledges.user Name of pledging user
 *     @apiSuccess {Boolean} projects.pledges.public Whether the pledge should publicly be displayed
 *     @apiSuccess {Number} projects.pledges.amount Pledge-Amount in cents
 *     @apiSuccess {Timestamp} projects.pledges.timestamp Timestamp of Pledge-Submit
 *   @apiSuccess {Boolean} projects.funded True if the projects has been successfully funded
 *   @apiSuccess {Boolean} projects.archived True if project is archived; False if active
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     projects: [
 *         {
 *             "created":"2015-10-18T11:13:18.561Z",
 *             "current":7300,
 *             "description":"Lorem ipsum dolor sit amet.",
 *             "funded":false,
 *             "archived":true,
 *             "goal":86300,
 *             "id":"4ffd324c-30cf-43ef-b770-6432ccb669a8",
 *             "name":"Fusion power plant",
 *             "owner":"Bob",
 *             "pledges":[
 *                 {
 *                     "amount":7300,
 *                     "public":true,
 *                     "timestamp":"2015-10-18T11:14:32.565Z",
 *                     "user":"Alice"
 *                 }
 *             ],
 *             "subtitle":"Revolutionize the world! Pure awesomeness."
 *         }
 *     ]
 */
router.get('/projects', function(req, res, next) {
    db.getAllProjects(function(result) {
      res.json({ projects: shuffle(rmPledgerNameArr(result)) });
    });
});

/**
 * @api {get} json/active_projects Get all active projects
 * @apiVersion 0.0.1
 * @apiName GetAllActiveProjects
 * @apiGroup JSON
 *
 * @apiSuccess {Object[]} projects Array of projects
 *   @apiSuccess {String} projects.id Project-UID
 *   @apiSuccess {String} projects.name Project name
 *   @apiSuccess {String} projects.subtitle  Short description of the project
 *   @apiSuccess {String} projects.owner Name of project-owner
 *   @apiSuccess {Timestamp} projects.created Project's create-timestamp
 *   @apiSuccess {String} projects.description Longer description of the project's goal
 *   @apiSuccess {Number} projects.goal Project's funding-goal in cents
 *   @apiSuccess {Number} projects.current Project's current funding
 *   @apiSuccess {Object[]} projects.pledges Array of Pledges
 *     @apiSuccess {String} projects.pledges.user Name of pledging user
 *     @apiSuccess {Boolean} projects.pledges.public Whether the pledge should publicly be displayed
 *     @apiSuccess {Number} projects.pledges.amount Pledge-Amount in cents
 *     @apiSuccess {Timestamp} projects.pledges.timestamp Timestamp of Pledge-Submit
 *   @apiSuccess {Boolean} projects.funded True if the projects has been successfully funded
 *   @apiSuccess {Boolean} projects.archived True if project is archived; False if active
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     projects: [
 *         {
 *             "created":"2015-10-18T11:13:18.561Z",
 *             "current":7300,
 *             "description":"Lorem ipsum dolor sit amet.",
 *             "funded":false,
 *             "archived":false,
 *             "goal":86300,
 *             "id":"4ffd324c-30cf-43ef-b770-6432ccb669a8",
 *             "name":"Fusion power plant",
 *             "owner":"Bob",
 *             "pledges":[
 *                 {
 *                     "amount":7300,
 *                     "public":true,
 *                     "timestamp":"2015-10-18T11:14:32.565Z",
 *                     "user":"Alice"
 *                 }
 *             ],
 *             "subtitle":"Revolutionize the world! Pure awesomeness."
 *         }
 *     ]
 */
router.get('/active_projects', function(req, res, next) {
    db.getActiveProjects(function(result) {
      res.json({ projects: shuffle(rmPledgerNameArr(result)) });
    });
});

/**
 * @api {get} json/archived_projects Get all archived projects
 * @apiVersion 0.0.1
 * @apiName GetAllArchivedProjects
 * @apiGroup JSON
 *
 * @apiSuccess {Object[]} projects Array of projects
 *   @apiSuccess {String} projects.id Project-UID
 *   @apiSuccess {String} projects.name Project name
 *   @apiSuccess {String} projects.subtitle  Short description of the project
 *   @apiSuccess {String} projects.owner Name of project-owner
 *   @apiSuccess {Timestamp} projects.created Project's create-timestamp
 *   @apiSuccess {String} projects.description Longer description of the project's goal
 *   @apiSuccess {Number} projects.goal Project's funding-goal in cents
 *   @apiSuccess {Number} projects.current Project's current funding
 *   @apiSuccess {Object[]} projects.pledges Array of Pledges
 *     @apiSuccess {String} projects.pledges.user Name of pledging user
 *     @apiSuccess {Boolean} projects.pledges.public Whether the pledge should publicly be displayed
 *     @apiSuccess {Number} projects.pledges.amount Pledge-Amount in cents
 *     @apiSuccess {Timestamp} projects.pledges.timestamp Timestamp of Pledge-Submit
 *   @apiSuccess {Boolean} projects.funded True if the projects has been successfully funded
 *   @apiSuccess {Boolean} projects.archived True if project is archived; False if active
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     projects: [
 *         {
 *             "created":"2015-10-18T11:13:18.561Z",
 *             "current":7300,
 *             "description":"Lorem ipsum dolor sit amet.",
 *             "funded":false,
 *             "archived":true,
 *             "goal":86300,
 *             "id":"4ffd324c-30cf-43ef-b770-6432ccb669a8",
 *             "name":"Fusion power plant",
 *             "owner":"Bob",
 *             "pledges":[
 *                 {
 *                     "amount":7300,
 *                     "public":true,
 *                     "timestamp":"2015-10-18T11:14:32.565Z",
 *                     "user":"Alice"
 *                 }
 *             ],
 *             "subtitle":"Revolutionize the world! Pure awesomeness."
 *         }
 *     ]
 */
router.get('/archived_projects', function(req, res, next) {
    db.getArchivedProjects(function(result) {
      res.json({ projects: shuffle(rmPledgerNameArr(result)) });
    });
});

/**
 * @api {get} json/project/:id Get a specific project's data
 * @apiVersion 0.0.1
 * @apiName GetProject
 * @apiGroup JSON
 *
 * @apiSuccess {String} id Project-UID
 * @apiSuccess {String} name Project name
 * @apiSuccess {String} subtitle  Short description of the project
 * @apiSuccess {String} owner Name of project-owner
 * @apiSuccess {Timestamp} created Project's create-timestamp
 * @apiSuccess {String} description Longer description of the project's goal
 * @apiSuccess {Number} goal Project's funding-goal in cents
 * @apiSuccess {Number} current Project's current funding
 * @apiSuccess {Object[]} pledges Array of Pledges
 *   @apiSuccess {String} pledges.user Name of pledging user
 *   @apiSuccess {Boolean} pledges.public Whether the pledge should publicly be displayed
 *   @apiSuccess {Number} pledges.amount Pledge-Amount in cents
 *   @apiSuccess {Timestamp} pledges.timestamp Timestamp of Pledge-Submit
 * @apiSuccess {Boolean} funded True if the projects has been successfully funded
 * @apiSuccess {Boolean} archived True if project is archived; False if active
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "created":"2015-10-18T11:13:18.561Z",
 *         "current":7300,
 *         "description":"Lorem ipsum dolor sit amet.",
 *         "funded":false,
 *         "archived":true,
 *         "goal":86300,
 *         "id":"4ffd324c-30cf-43ef-b770-6432ccb669a8",
 *         "name":"Fusion power plant",
 *         "owner":"Bob",
 *         "pledges":[
 *             {
 *                 "amount":7300,
 *                 "public":true,
 *                 "timestamp":"2015-10-18T11:14:32.565Z",
 *                 "user":"Alice"
 *             }
 *         ],
 *         "subtitle":"Revolutionize the world! Pure awesomeness."
 *     }
 *
 * @apiError ProjectNotFound No project is associated with this UID.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "project_not_found"
 *     }
 */
router.get('/project/:id', function(req, res, next) {
    db.getProjectByID(req.params.id, function(project) {
        if (project == null)
            res.status(404).json({error: 'project_not_found'});
        res.json(rmPledgerName(project));
    });
});

/**
 * @api {post} json/projects/new Create a new project
 * @apiVersion 0.0.1
 * @apiName CreateProject
 * @apiGroup JSON
 *
 * @apiParam {String} project_name Name of project.
 * @apiParam {String} owner_name Name of owner.
 * @apiParam {String} project_subtitle Short description of project.
 * @apiParam {Number} project_goal Project-Goal in cents.
 * @apiParam {String} project_description (Longer) project description.
 *
 * @apiSuccess {String} id Project-UID
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "id":"4ffd324c-30cf-43ef-b770-6432ccb669a8"
 *     }
 *
 * @apiError MissingField Not all nescessary fields are given.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "missing_field"
 *     }
 */
// TODO: Throw missing field error
router.post('/projects/new', function(req, res, next) {
    var newProject = {
        name: req.body.project_name,
        owner: req.body.project_owner,
        subtitle: req.body.project_subtitle,
        goal: parseInt(req.body.project_goal),
        description: req.body.project_description
    }
    db.createProject(newProject, function(id) {
        res.status(200).json({id: id});
    });
});

/**
 * @api {post} json/project/:id/pledge Pledge for a project
 * @apiVersion 0.0.1
 * @apiName PledgeProject
 * @apiGroup JSON
 *
 * @apiParam {String} pledge_user Name of user.
 * @apiParam {String} pledge_amount Amount to pledge (in cents).
 * @apiParam {Boolean} pledge_public Whether the name should be publicly displayed.
 *
 * @apiSuccess {String} id Project-UID
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError MissingField Not all nescessary fields are given.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "missing_field"
 *     }
 */
// TODO: Throw missing field error
router.post('/project/:id/pledge', function(req, res, next) {
    var pledge = {
        user: req.body.pledge_user,
        amount: req.body.pledge_amount,
        public: req.body.pledge_public
    }
    db.pledgeForProject(req.params.id, pledge, function (id) {
        res.status(200).send('done');
    });
});

module.exports = router;
