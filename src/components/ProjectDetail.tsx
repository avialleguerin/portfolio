import type { Project } from '../types'

interface ProjectDetailProps {
  project: Project
  onBack?: () => void
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
  return (
    <div className="relative w-full h-full">
      {/* Content layout inspired by the provided design */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left side: Stacked images like in the reference */}
          <div className="relative">
            {/* Main project image */}
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              <div className="aspect-[4/3] bg-black/20 rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.6)] transform rotate-2">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              
              {/* Secondary stacked images for visual interest */}
              <div className="absolute -top-4 -left-6 w-32 h-24 bg-black/30 rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] transform -rotate-12 z-[-1]">
                <img src={project.image} alt="" className="w-full h-full object-cover opacity-60" />
              </div>
              
              <div className="absolute -bottom-6 -right-4 w-28 h-20 bg-black/30 rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] transform rotate-6 z-[-1]">
                <img src={project.image} alt="" className="w-full h-full object-cover opacity-40" />
              </div>
            </div>
          </div>

          {/* Right side: Content structured like the reference */}
          <div className="space-y-8">
            {/* Header section */}
            <div>
              <div className="text-xs font-lagu tracking-[4px] text-white/60 uppercase mb-4">— About Project</div>
              <h1 className="font-lemon text-4xl lg:text-5xl text-white leading-tight tracking-[2px] mb-6">
                {project.title}
              </h1>
              <p className="font-antario text-lg text-[#c9c9c9e6] leading-relaxed max-w-lg">
                {project.description}
              </p>
            </div>

            {/* Tools/Features section */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {(project.tools || []).slice(0, 3).map((tool) => (
                <div key={tool} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                  </div>
                  <div className="text-xs font-lagu tracking-[2px] text-white/80 uppercase">
                    {tool}
                  </div>
                </div>
              ))}
            </div>

            {/* All tools list */}
            {(project.tools || []).length > 3 && (
              <div className="pt-4">
                <div className="text-xs font-lagu tracking-[3px] text-white/60 uppercase mb-3">Additional Tools</div>
                <div className="flex flex-wrap gap-2">
                  {(project.tools || []).slice(3).map((tool) => (
                    <span key={tool} className="text-xs tracking-wider uppercase bg-white/5 text-white/70 border border-white/10 rounded-full px-3 py-1">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back button */}
            {onBack && (
              <div className="pt-6">
                <button
                  onClick={onBack}
                  className="font-lagu font-medium py-[14px] px-[32px] text-xs tracking-[3px] text-white/80 bg-[#1a1a1a] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300 uppercase hover:text-white hover:bg-[#2a2a2a] hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-lg"
                >
                  ← Back to Projects
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
