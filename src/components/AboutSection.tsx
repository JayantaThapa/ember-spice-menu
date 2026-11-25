export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-white/[0.06] bg-[#0B0B0B] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wider text-[#E59B3B]">
              Our Story
            </p>
            <h2
              id="about-heading"
              className="mt-2 font-display text-3xl font-bold leading-tight text-white sm:text-4xl"
            >
              Made with passion.
              <br />
              Served with flavour.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="max-w-2xl text-base leading-relaxed text-[#B8B8B8] sm:text-lg">
              At EMBER &amp; SPICE, we believe every meal should be memorable. From freshly prepared ingredients to authentic spices, every dish is created to bring people together.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/[0.08] pt-6">
              <div>
                <p className="font-display text-xl font-bold text-[#F5C16C] sm:text-2xl">
                  Fresh
                </p>
                <p className="mt-1 text-xs text-[#B8B8B8] sm:text-sm">
                  Prepared to order
                </p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-[#F5C16C] sm:text-2xl">
                  Spiced
                </p>
                <p className="mt-1 text-xs text-[#B8B8B8] sm:text-sm">
                  Roasted whole blends
                </p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-[#F5C16C] sm:text-2xl">
                  Tandoor
                </p>
                <p className="mt-1 text-xs text-[#B8B8B8] sm:text-sm">
                  Clay-oven finishes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
