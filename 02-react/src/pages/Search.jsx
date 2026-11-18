import { useState } from 'react'

import { Pagination } from '../components/Pagination.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobListings } from '../components/JobListings.jsx'

import jobsData from '../data.json'

const RESULTS_PER_PAGE = 3;


export function SearchPage() {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: ''
  })

  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1);

  const filteredJobs = jobsData.filter(job => {
    const matchText = job.titulo.toLowerCase().includes(textToFilter.toLowerCase())

    const matchFilters =
      (!filters.technology || job.data.tecnologia === filters.technology) &&
      (!filters.location || job.data.modalidad === filters.location) &&
      (!filters.experienceLevel || job.data.nivel === filters.experienceLevel)

    return matchText && matchFilters
  })

  const totalPages = Math.ceil(filteredJobs.length / RESULTS_PER_PAGE);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
    setCurrentPage(1)
  }

  /* const clearFilters = () => {
    setFilters({
      technology: '',
      location: '',
      experienceLevel: ''
    })
    setCurrentPage(1)
  } */

  return (
    <main>
      <SearchFormSection
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
        textToFilter={textToFilter}
        onFilterChange={handleFilterChange}
        filters={filters}
      />

      <section>
        <JobListings
          jobs={paginatedJobs}
          filteredJobs={filteredJobs}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  )
}

