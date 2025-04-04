// src/data/mockStudies.js
export const mockStudies = [
    {
        id: 12,
        paper_title: "A3: Assisting Android API Migrations Using Code Examples.",
        paper_author: "Maxime Lamothe, Weiyi Shang, Tse-Hsun Peter Chen",
        paper_year: 2022,
        paper_type: "Journal",
        paper_venue: "IEEE TSE",
        paper_goals: "Can we identify API migration patterns from public code examples#To what extent can our approach provide assistance when migrating APIs#How much time can our approach save when migrating APIs",
        paper_criteria: "hosted on GitHub#implemented in Java#still actively under development#contain readily available tests#built with the official Android build system",
        paper_project: "FDroid",
        paper_link: "https://github.com/senseconcordia/A3",
        data_available: true,
    },
    {
        id: 13,
        paper_title: "A Multi-Armed Bandit Approach for Test Case Prioritization in Continuous Integration Environments",
        paper_author: "Jackson A. Prado Lima, Silvia Regina Vergilio",
        paper_year: 2022,
        paper_type: "Journal",
        paper_venue: "IEEE TSE",
        paper_goals: "What is the best configuration for COLEMAN#IS COLEMAN applicable in the CI development context#Can COLEMAN...",
        paper_criteria: "non-toy#non-fork#active GitHub projects#systems already used in the literature#Java",
        paper_project: "TravisTorrent#guava",
        paper_link: "https://ieeexplore.ieee.org/stampPDF/osf.io/wmcbt",
        data_available: true,
    },
    {
        id: 14,
        paper_title: "A Methodology for Analyzing Uptake of Software Technologies Among Developers",
        paper_author: "Yuxing Ma, Audris Mockus, Russell Zaretzki, Randy V. Bradley, Bogdan C. Bichescu",
        paper_year: 2022,
        paper_type: "Journal",
        paper_venue: "IEEE TSE",
        paper_goals: "Does the exposure to a technology, such as the number of FLOSS repositories in existence, the rate at which...",
        paper_criteria: "R language#JavaScript",
        paper_project: "CRAN#npm",
        paper_link: "https://drive.google.com/drive/folders/1YjC3115NrD5XzI5ZyxtRLF290M2owb1X?usp=sharing",
        data_available: false,
    },
    // ... προσθέστε περισσότερες μελέτες
];

export const totalStudiesCount = 394; // Για το γράφημα Fig 4.1
export const availableDataCount = 273; // Για το γράφημα Fig 4.1