import { useState } from "react";
import type { Contribution } from "../types/heatmap";
import Heatmap from "./GithubHeatmap/Heatmap";

interface BioCardProps {
	contributions: Contribution[];
	avatarSrc: string;
}

const originalBioHTML = (
	<>
		I'm a{" "}
		<a
			href="https://en.wikipedia.org/wiki/Software_engineer"
			className="border-b border-red-300 hover:border-b-2 hover:border-red-300 text-red-600 font-semibold transition-colors"
		>
			SWE
		</a>{" "}
		at{" "}
		<a
			className="border-neutral-400 border-b hover:border-red-300 hover:border-b-2 text-neutral-700 font-semibold transition-colors dark:border-neutral-600 dark:text-neutral-200"
			href="https://www.youtube.com/"
		>
			YouTube
		</a>{" "}
		and Computer Science graduate from the{" "}
		<a
			className="border-neutral-400 border-b hover:border-red-300 hover:border-b-2 text-blue-700 font-semibold transition-colors dark:border-neutral-600 dark:text-sky-400"
			href="https://www.eng.ufl.edu/"
		>
			University of Florida 🐊
		</a>{" "}
		from{" "}
		<a
			href="https://en.wikipedia.org/wiki/Tampa_Bay"
			className="border-b border-red-200 hover:border-b-2 hover:border-red-300 text-neutral-600 font-semibold transition-colors dark:text-neutral-300"
		>
			Tampa Bay
		</a>
		, located in{" "}
		<a
			href="https://en.wikipedia.org/wiki/San_Francisco_Bay"
			className="border-b border-red-200 hover:border-b-2 hover:border-red-300 text-neutral-600 font-semibold transition-colors dark:text-neutral-300"
		>
			SF Bay
		</a>{" "}
		📍
	</>
);

export default function BioCard({ contributions, avatarSrc }: BioCardProps) {
	const [selectedDay, setSelectedDay] = useState<Contribution | null>(null);
	const [isVisible, setIsVisible] = useState(true);

	// Update Heatmap component to use shared state
	const handleDayHover = (contribution: Contribution | null) => {
		// Always fade when content changes (including switching back to bio text)
		const isChanging = (selectedDay?.date !== contribution?.date) || 
		                   (selectedDay === null && contribution !== null) ||
		                   (selectedDay !== null && contribution === null);
		
		if (isChanging) {
			// Fade out, then update, then fade in
			setIsVisible(false);
			setTimeout(() => {
				setSelectedDay(contribution);
				// Small delay to ensure DOM update, then fade in
				setTimeout(() => {
					setIsVisible(true);
				}, 10);
			}, 400); // Half of the transition duration
		} else {
			// No change, just update directly
			setSelectedDay(contribution);
		}
	};

	return (
		<div className="bg-white border border-neutral-200 rounded-2xl p-4 mb-6 font-sans dark:border-neutral-800 dark:bg-neutral-900">
			<div className="flex items-center gap-4 mb-4 min-h-[64px]">
				<img
					src={avatarSrc}
					alt="Image of Jonathan Groberg"
					loading="eager"
					className="w-16 h-16 rounded-full border border-neutral-200 object-cover dark:border-neutral-700 flex-shrink-0"
				/>
				<div className="flex-1 flex flex-col min-w-0">
					<div className="text-left min-w-0 relative min-h-[48px]">
						<p 
							className={`text-base text-neutral-800 leading-relaxed mb-0 dark:text-neutral-100 transition-opacity duration-800 ${
								isVisible ? 'opacity-100' : 'opacity-0'
							}`}
						>
							{selectedDay ? (
								<>
									<span className="underline">
										{selectedDay.intensity}
									</span>{" "}
									Contributions on {selectedDay.date}
								</>
							) : (
								originalBioHTML
							)}
						</p>
					</div>
				</div>
			</div>
			<div>
				<Heatmap
					contributions={contributions}
					onDayHover={handleDayHover}
				/>
			</div>
		</div>
	);
}
