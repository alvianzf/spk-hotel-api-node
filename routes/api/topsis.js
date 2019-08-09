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
        distanceSq = distanceSq + (choices[i].distance/100)*(choices[i].distance/100)
    }
    distanceSq = Math.sqrt(distanceSq)

    for (var i = 0; i < choices.length; i++) {
        matrix = (choices[i].distance / distanceSq) * 30
        distMatrix.push(matrix)
    }
    
    // Rate normalization matrix
    for (var i = 0; i < choices.length; i++) {
        rateSq = rateSq + ((price - choices[i].rate)/100000)*((price - choices[i].rate)/100000)
    }
    rateSq = Math.sqrt(rateSq)

    for (var i = 0; i < choices.length; i++) {
        matrix = ((price - choices[i].rate) / rateSq) * 40
        rateMatrix.push(matrix)
    }

    // Facilities normalization matrix
    for (var i = 0; i < choices.length; i++) {
        PrefSq = PrefSq + (preference - choices[i].facilities)*(preference - choices[i].facilities)
    }
    PrefSq = Math.sqrt(PrefSq)

    for (var i = 0; i < choices.length; i++) {
        matrix = (choices[i].facilities / PrefSq)
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
        dist = (distMatrix[i] - NIS[0])*(distMatrix[i] - NIS[i])
        rates = (rateMatrix[i] - NIS[1])*(rateMatrix[i] - NIS[1])
        prefs = (preferenceMatrix[i] - NIS[2])*(preferenceMatrix[i] - NIS[2])

        negDet.push(Math.sqrt(dist + rates +prefs))
    }
    negDet.pop()

    // Determinants Positive
    for (var i = 0; i < choices.length; i++) {
        dist = (distMatrix[i] - PIS[0])*(distMatrix[i] - PIS[i])
        rates = (rateMatrix[i] - PIS[1])*(rateMatrix[i] - PIS[1])
        prefs = (preferenceMatrix[i] - PIS[2])*(preferenceMatrix[i] - PIS[2])

        posDet.push(Math.sqrt(dist + rates +prefs))
    }
    posDet.pop()
    
    // Preference Matrix 

    for(var i =0; i < negDet.length; i++) {
        finalMatrix.push(posDet[i]/(posDet[i]+negDet[i]))
    }

    choice = Math.max(...finalMatrix)

    finalChoice = choices[finalMatrix.indexOf(choice)].name

    // return res.status(200).json({status: 200, choice: finalChoice});

    return res.status(200).json({status: 200, choice: 'OK'});
})

module.exports = router