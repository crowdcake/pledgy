var db = require('../lib/db');

var express = require('express');
var router = express.Router();
var shuffle = require('shuffle-array');

/**
 * @api {get} json/active_projects Get all projects (active & archived)
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
      res.json({ projects: shuffle(result) });
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
      res.json({ projects: shuffle(result) });
    });
});

/**
 * @api {get} json/active_projects Get all archived projects
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
      res.json({ projects: shuffle(result) });
    });
});


module.exports = router;
