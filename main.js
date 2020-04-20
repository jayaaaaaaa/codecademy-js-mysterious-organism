// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Generates new pAequor instances
const pAequorFactory = (specimenNum, dna) => {
  return ({
  specimenNum,
  dna,
  
  // Returns mutated DNA, where one random base in the DNA is altered
  mutate () {
    let newDna = this.dna;
    let i = Math.floor(Math.random() * newDna.length - 1);
    let currentBase = newDna[i];
    let newBase;
    do {
      newBase = returnRandBase();  
    }
    while (currentBase === newBase);
    newDna[i] = newBase;
    return newDna;
  },
  
  // Returns a string where comparison between two pAequor instances is calculated
  compareDNA (organism) {
    let commonCount = 0;
    for (i = 0; i < this.dna.length; i++) {
      if (this.dna[i] === organism.dna[i]) {
          commonCount++;
      }
    }
    let commonPercent = Math.floor((commonCount / this.dna.length) * 100);
    return `Result: Specimen #${specimenNum} and Specimen #${organism.specimenNum} have ${commonPercent}% in common.`;
  },
  
  // Returns number which is the percentage comparison between two pAequor instances - used for getTopTwo function
  commonPercent (organism) {
    let commonCount = 0;
    for (i = 0; i < this.dna.length; i++) {
      if (this.dna[i] === organism.dna[i]) {
          commonCount++;
      }
    }
    let commonPercent = Math.floor((commonCount / this.dna.length) * 100);
    return commonPercent;
  },
  
  // Returns true when pAequor DNA contains at least 60% combination of 'C' and 'G' bases
  willLikelySurvive () {
    let count = 0;
    for (i = 0; i < this.dna.length; i++) {
      if (this.dna[i] === 'C' || this.dna[i] === 'G') {
        count++;
      }
    }
    let countPercent = Math.floor(count / this.dna.length * 100);
    // Conditional ternary operator
    let willLikelySurvive = (countPercent >= 60) ? true : false;
    
    /*  Alternative if, else conditional operator:
     *  if (countPercent >= 60) {
     *    return true;
     *  } else {
     *    return false;
     *  }
     */
    return willLikelySurvive; 
  },
  
  // Alters the DNA bases and returns new complementary strand
  complementStrand () {
    let complementStrand = this.dna;
    for (i = 0; i < complementStrand.length; i++) {
      if (complementStrand[i] === 'A') {
        complementStrand[i] = 'T';
      } else if (complementStrand[i] === 'T') {
        complementStrand[i] = 'A';
      } else if (complementStrand[i] === 'C') {
        complementStrand[i] = 'G';
      } else if (complementStrand[i] === 'G') {
        complementStrand[i] = 'C';
      } 
    }
    return complementStrand;
  }
  });
}

// Returns an array containing 30 pAequor objects with at least 60% survival rate
const thirtyThatWillSurvive = () => {
let thirtyThatWillSurvive = [];
  for (let i = 1; thirtyThatWillSurvive.length < 30; i++) {
  let newInstance = pAequorFactory(i, mockUpStrand());
  if (newInstance.willLikelySurvive()) {
  thirtyThatWillSurvive.push(newInstance);
    }
  }
  return thirtyThatWillSurvive;
}

// Array containing 30 pAeqour that will survive
const survive = thirtyThatWillSurvive();

// Finds the two most related instances of pAequor by storing and sorting results in an array as [percentage, specimen#1, specimen#2)
const getTopTwo = () => {
  let compareAll = [];
  let finalTwo = [];
  for (let i = 0; i < survive.length; i++) {
    for (let j = 0; j < survive.length; j++){
      if (survive[i].commonPercent(survive[j]) && survive[i] !== survive[j]) {
        let top;
        top = survive[i].commonPercent(survive[j]);
        compareAll.push([top, survive[i].specimenNum, survive[j].specimenNum]);
        compareAll.sort();
        compareAll.reverse();
        finalTwo = compareAll.slice(0, 3);
      }
    }
  }
  if (finalTwo[0][1] === finalTwo[1][2]) {
      finalTwo.splice(1, 1);
    } else {
      finalTwo.splice(2, 2);
    }
  // Prints the top two most related instances of pAqueor
  return `The two most related instances of pAequor are: Specimen #${finalTwo[0][1]} and #${finalTwo[0][2]} with ${finalTwo[0][0]}% in common AND Specimen #${finalTwo[1][1]} and #${finalTwo[1][2]} with ${finalTwo[1][0]}% in common.`
}
