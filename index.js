const express = require("express")
const exphbs = require('express-handlebars');

const SettingsBill = require("./settings-bill")

const app = express();
const settingsBill = SettingsBill()
// configer handlebars
app.engine('handlebars', exphbs({ layoutsDir: "views/layout/" }));
app.set('view engine', 'handlebars');

// make public folder visiable
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// parse application/x-www-form-urlencoded

// parse application/json


app.get("/", function (req, res) {
    res.render("index", {
        settings: settingsBill.getSettings(),
        Totals: settingsBill.totals(),


       
    });
});

app.post("/settings", function (req, res) {

    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel,

    });

    res.redirect("/")
});

app.post("/action", function (req, res) {
    settingsBill.recordAction(req.body.actionType)
  
    
    res.redirect("/")
});

app.get("/actions", function (req, res) {
res.render("actions", {actions : settingsBill.actions()});

})

app.get("/actions:actionType", function (req, res) {
    const actionType = req.params.actionType
    res.render("actions", {actions : settingsBill.actionsfor(actionType)});
})

const PORT = process.env.PORT || 3011

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});