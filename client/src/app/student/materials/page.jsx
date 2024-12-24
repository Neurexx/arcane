// "use client";

// import { useState, useMemo, useEffect, useCallback } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { BarChartIcon, BookIcon, CheckIcon, ExamIcon, ForumIcon, SettingsIcon } from "@/components/ui/icons";

// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);
//   return debouncedValue;
// }

// const NavigationLink = ({ icon: Icon, href, label, active }) => (
//   <Tooltip>
//     <TooltipTrigger asChild>
//       <Link
//         href={href}
//         className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
//           active ? 'bg-primary text-accent-foreground' : 'bg-accent text-accent-foreground'
//         }`}
//         prefetch={false}
//       >
//         <Icon className="h-5 w-5" />
//         <span className="sr-only">{label}</span>
//       </Link>
//     </TooltipTrigger>
//     <TooltipContent side="right">{label}</TooltipContent>
//   </Tooltip>
// );

// const FilterSelect = ({ value, onChange, options, placeholder, className }) => (
//   <Select value={value} onValueChange={onChange}>
//     <SelectTrigger className={className}>
//       <SelectValue placeholder={placeholder} />
//     </SelectTrigger>
//     <SelectContent>
//       {options.map(option => (
//         <SelectItem key={option.value} value={option.value}>
//           {option.label}
//         </SelectItem>
//       ))}
//     </SelectContent>
//   </Select>
// );

// export default function ExamPapersPage() {
//   const [searchParams, setSearchParams] = useState({
//     searchTerm: '',
//     subject: 'All Subjects',
//     year: 'All Years',
//     sortBy: 'Default'
//   });
//   const [examPapers, setExamPapers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const debouncedSearchTerm = useDebounce(searchParams.searchTerm, 500);

//   const fetchExamPapers = useCallback(async () => {
//     const source = axios.CancelToken.source();
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get('/api/papers', {
//         params: { paperName: debouncedSearchTerm },
//         cancelToken: source.token
//       });
//       setExamPapers(response.data);
//     } catch (err) {
//       if (!axios.isCancel(err)) {
//         setError('Failed to fetch exam papers');
//       }
//     } finally {
//       setLoading(false);
//     }
//     return () => source.cancel();
//   }, [debouncedSearchTerm]);

//   const filteredPapers = useMemo(() => {
//     let result = [...examPapers];
//     if (searchParams.subject !== 'All Subjects') {
//       result = result.filter(paper => paper.subject === searchParams.subject);
//     }
//     if (searchParams.year !== 'All Years') {
//       result = result.filter(paper => paper.year === Number(searchParams.year));
//     }
//     if (searchParams.sortBy === 'subject') {
//       result.sort((a, b) => a.subject.localeCompare(b.subject));
//     } else if (searchParams.sortBy === 'year') {
//       result.sort((a, b) => a.year - b.year);
//     }
//     return result;
//   }, [examPapers, searchParams]);

//   useEffect(() => {
//     if (debouncedSearchTerm || debouncedSearchTerm === '') {
//       fetchExamPapers();
//     }
//   }, [debouncedSearchTerm, fetchExamPapers]);

//   const handleParamChange = useCallback((key, value) => {
//     setSearchParams(prev => ({ ...prev, [key]: value }));
//   }, []);

//   const handleViewClick = async (key) => {
//     try {
//       const response = await axios.post("/api/papers/url", { key });
//       const link = document.createElement("a");
//       link.href = response.data.url;
//       link.download = 'paper.pdf';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       alert("Failed to download the file. Please try again.");
//     }
//   };

//   const renderPaperCard = (paper) => (
//     <div key={paper._id} className="bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
//       <img
//         src={paper.previewImage}
//         alt={paper.paperName}
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <h3 className="text-lg font-semibold mb-2">{paper.subject}</h3>
//         <div className="flex items-center gap-2 mb-2">
//           <span className="text-sm text-muted-foreground">Year: {paper.year}</span>
//         </div>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => handleViewClick(`${paper.collegeName}/${paper.department}/${paper.paperCode}/${paper.paperCode}-${paper.year}.pdf`)}
//         >
//           View Exam Paper
//         </Button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex w-full flex-col">
//       <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
//         <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
//           <TooltipProvider>
//             <Link href="/dashboard" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
//               <BookIcon className="h-4 w-4 transition-all group-hover:scale-110" />
//               <span className="sr-only">College Dashboard</span>
//             </Link>
//             <NavigationLink icon={CheckIcon} href="/papers" label="Exam Papers" active />
//             <NavigationLink icon={ExamIcon} href="/exams" label="Online Exams" />
//             <NavigationLink icon={BarChartIcon} href="/progress" label="Progress Tracker" />
//             <NavigationLink icon={ForumIcon} href="/threads" label="Community" />
//           </TooltipProvider>
//         </nav>
//         <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
//           <TooltipProvider>
//             <NavigationLink icon={SettingsIcon} href="#" label="Settings" />
//           </TooltipProvider>
//         </nav>
//       </aside>
//       <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//         <main className="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
//           <h1 className="text-3xl font-bold mb-6">Previous Exam Papers</h1>
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
//             <div className="flex-1">
//               <Input
//                 type="search"
//                 placeholder="Search by subject..."
//                 value={searchParams.searchTerm}
//                 onChange={(e) => handleParamChange('searchTerm', e.target.value)}
//                 className="w-full"
//               />
//             </div>
//             <div className="flex items-center gap-2 flex-wrap">
//               <FilterSelect
//                 value={searchParams.subject}
//                 onChange={(value) => handleParamChange('subject', value)}
//                 options={[
//                   { value: "All Subjects", label: "All Subjects" },
//                   { value: "Mathematics", label: "Mathematics" },
//                   { value: "Physics", label: "Physics" },
//                   { value: "Chemistry", label: "Chemistry" },
//                   { value: "Biology", label: "Biology" },
//                   { value: "English", label: "English" }
//                 ]}
//                 placeholder="Select subject"
//                 className="w-48"
//               />
//               <FilterSelect
//                 value={searchParams.year}
//                 onChange={(value) => handleParamChange('year', value)}
//                 options={[
//                   { value: "All Years", label: "All Years" },
//                   { value: "2023", label: "2023" },
//                   { value: "2022", label: "2022" },
//                   { value: "2021", label: "2021" },
//                   { value: "2020", label: "2020" }
//                 ]}
//                 placeholder="Select year"
//                 className="w-32"
//               />
//               <FilterSelect
//                 value={searchParams.sortBy}
//                 onChange={(value) => handleParamChange('sortBy', value)}
//                 options={[
//                   { value: "Default", label: "Default" },
//                   { value: "subject", label: "Subject" },
//                   { value: "year", label: "Year" }
//                 ]}
//                 placeholder="Sort by"
//                 className="w-32"
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {!loading && filteredPapers.map(renderPaperCard)}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from 'react';

export default function MaterialsPage() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dummy data for demonstration purposes
  const allMaterials = {
    "2024": {
      "Math": [
        { title: "Algebra Basics", link: "/materials/algebra_basics.pdf" },
        { title: "Geometry Essentials", link: "/materials/geometry_essentials.pdf" },
      ],
      "Physics": [
        { title: "Kinematics Overview", link: "/materials/kinematics_overview.pdf" },
        { title: "Optics Theory", link: "/materials/optics_theory.pdf" },
      ]
    },
    "2023": {
      "Math": [
        { title: "Calculus Introduction", link: "/materials/calculus_intro.pdf" },
        { title: "Trigonometry Basics", link: "/materials/trig_basics.pdf" },
      ],
      "Chemistry": [
        { title: "Organic Chemistry", link: "/materials/organic_chemistry.pdf" },
        { title: "Inorganic Chemistry", link: "/materials/inorganic_chemistry.pdf" },
      ]
    }
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedSubject(''); // Reset subject when year changes
    setMaterials([]);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setMaterials(allMaterials[selectedYear]?.[e.target.value] || []);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-100">

      <div className="flex-1 p-10 bg-white rounded-l-lg shadow-2xl">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Find Study Materials</h2>

        {/* Dropdowns */}
        <div className="space-y-6 mb-8">
          <div>
            <label htmlFor="year" className="block text-lg font-medium text-gray-700 mb-2">Select Year</label>
            <select
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value="">-- Choose Year --</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">Select Subject</label>
            <select
              id="subject"
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              disabled={!selectedYear}
            >
              <option value="">-- Choose Subject --</option>
              {selectedYear && Object.keys(allMaterials[selectedYear] || {}).map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="bg-red-200 text-red-600 p-4 rounded-lg shadow-md mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Materials List */}
        {selectedYear && selectedSubject && materials.length === 0 && (
          <p className="text-gray-600">No materials found for this selection.</p>
        )}

        {materials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 col-span-full">Available Materials</h3>

            {/* Material Cards */}
            {materials.map((material, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl">
                <a href={material.link} className="text-xl font-semibold text-indigo-600 hover:text-indigo-800" target="_blank" rel="noopener noreferrer">
                  {material.title}
                </a>
                <p className="text-gray-500 mt-2">Click to download the material.</p>
              </div>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center mt-6">
            <p className="text-gray-600">Loading materials...</p>
          </div>
        )}
      </div>
    </div>
  );
}
