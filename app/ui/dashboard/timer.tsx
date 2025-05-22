"use client";

import { Tables } from "@/database.types";
import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

type TaskListProps = {
    tasks: Tables<"tasks">[] | undefined;
};

export default function Timer({ tasks }: TaskListProps) {
    const [isPaused, setIsPaused] = useState(true);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskNo'); 

    const activeTask = tasks && tasks.find((task) => task.id === taskId);

    useEffect(() => {
        if (isPaused) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(() => {
            if (hours === 0 && minutes === 0 && seconds === 0) {
                setIsPaused(true);
            }
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            else if (seconds === 0 && minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
            else if (seconds === 0 && minutes === 0 && hours > 0) {
                setHours(hours - 1);
                setMinutes(59);
                setSeconds(59);
            }
        }, 1000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, seconds]);

    const handlePlay = () => {
        if (hours === 0 && minutes === 0 && seconds === 0) return;
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(true);
    };

    const handleReset = () => {
        setIsPaused(true);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    };

    const pad = (n: number) => n.toString().padStart(2, "0");

    return (
        <div className="flex justify-center items-center flex-col bg-gray-100 p-15 rounded-2xl mr-3">
            <p className=" bg-gray-800 text-white text-xs rounded-lg px-3 py-1">
                Active Task: <span>{activeTask ? activeTask.task : "None"}</span>
            </p>
            <div className="text-7xl flex items-center">
                <input
                    min={0}
                    max={99}
                    value={pad(hours)}
                    onChange={(e) => setHours(Math.max(0, Math.min(99, Number(e.target.value)) || 0))}
                    className="w-24 appearance-none outline-none focus:outline-none focus:underline bg-transparent text-center font-bold"
                    placeholder="00"
                    disabled={!isPaused}
                /><span>:</span>
                <input
                    min={0}
                    max={59}
                    value={pad(minutes)}
                    onChange={(e) => setMinutes(Math.max(0, Math.min(59, Number(e.target.value)) || 0))}
                    className="w-24 appearance-none outline-none focus:outline-none focus:underline bg-transparent text-center font-bold"
                    placeholder="00"
                    disabled={!isPaused}
                /><span>:</span>
                <p className="font-bold">{pad(seconds)}</p>
            </div>
            <div className="flex justify-between w-48 mt-5">
                {isPaused ? (
                    <button onClick={handlePlay}>
                        <PlayIcon className="h-15 w-15" />
                    </button>
                ) : (
                    <button onClick={handlePause}>
                        <PauseIcon className="h-15 w-15" />
                    </button>
                )}
                <button onClick={handleReset}>
                    <StopIcon className="h-15 w-15" />
                </button>
            </div>
        </div>
    );
}