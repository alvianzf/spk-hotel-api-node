var router = require('express').Router()
var choices = require('../../hotels/choices')

var distMatrix = [],
    rateMatrix = [], 
    preferenceMatrix = [],
    NIS = [],
    PIS = [],
    negDet = [],
    posDet =[],
    finalMatrix =[]

var distanceSq = 0,
    rateSq = 0,
    PrefSq = 0

router.get('/', function(req, res) {
    let preference = req.body.preference,
        price = req.body.price

    // Distance normalization matrix
    for (var i = 0; i < choices.length; i++) {
        distanceSq = distanceSq + ((10000-choices[i].distance)/100)*((10000-choices[i].distance)/100)
    }
    distanceSq = Math.sqrt(distanceSq)

    for (var i = 0; i < choices.length; i++) {
        matrix = (((10000-choices[i].distance)/100) / distanceSq) * 10
        distMatrix.push(matrix)
    }
    
    // Rate normalization matrix
    for (var i = 0; i < choices.length; i++) {
        temp = Math.abs(price - choices[i].rate)
        rate = Math.abs(10 - temp)

        rateSq = rateSq + rate
    }
    rateSq = Math.sqrt(rateSq)

    for (var i = 0; i < choices.length; i++) {
        matrix = Math.abs((10 - Math.abs(price - choices[i].rate)) / rateSq) * 50
        rateMatrix.push(matrix)
    }

    // Facilities normalization matrix
    for (var i = 0; i < choices.length; i++) {
        prefs = 100 - Math.abs(preference - choices[i].facilities)
        PrefSq = PrefSq + (prefs*prefs)
    }
    PrefSq = Math.sqrt(PrefSq)

    for (var i = 0; i < choices.length; i++) {
        matrix = ((10 - Math.abs(preference - choices[i].facilities)) / PrefSq) * 30
        preferenceMatrix.push(matrix)
    }

    // Negative Ideal Solution (NIS)
    NIS.push(Math.min(...distMatrix))
    NIS.push(Math.min(...rateMatrix))
    NIS.push(Math.min(...preferenceMatrix))

    // Positive Ideas Solution (PIS)
    PIS.push(Math.max(...distMatrix))
    PIS.push(Math.max(...rateMatrix))
    PIS.push(Math.max(...preferenceMatrix))

    // Determinants Negative
    for (var i = 0; i < choices.length; i++) {
        dist = (distMatrix[i] - NIS[0])*(distMatrix[i] - NIS[0])
        rates = (rateMatrix[i] - NIS[1])*(rateMatrix[i] - NIS[1])
        prefs = (preferenceMatrix[i] - NIS[2])*(preferenceMatrix[i] - NIS[2])
        
        negDet.push(Math.sqrt((dist + rates +prefs)))

    }

    // Determinants Positive
    for (var i = 0; i < choices.length; i++) {
        dist = (distMatrix[i] - PIS[0])*(distMatrix[i] - PIS[0])
        rates = (rateMatrix[i] - PIS[1])*(rateMatrix[i] - PIS[1])
        prefs = (preferenceMatrix[i] - PIS[2])*(preferenceMatrix[i] - PIS[2])

        posDet.push(Math.sqrt((dist + rates +prefs)))

    }
    

    // Preference Matrix 

    for(var i =0; i < negDet.length; i++) {
        finalMatrix.push(posDet[i]/(posDet[i]+negDet[i]))
    }


    choice = Math.max(...finalMatrix)
    index = finalMatrix.indexOf(choice)

    finalChoice = choices[index].name

    // distMatrix = []
    // rateMatrix = []
    // preferenceMatrix = []
    // negDet = []
    // posDet = []
    // finalMatrix = []
    // PIS = []
    // NIS = []


    return res.status(200).json({status: 200, choice: finalChoice});

    // return res.status(200).json({status: 200, choice: 'OK'});
})

module.exports = router