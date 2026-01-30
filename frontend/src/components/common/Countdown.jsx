import { useCountdown } from '../../hooks/useCountdown';

const Countdown = ({ targetDate, onComplete }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    if (onComplete) onComplete();
    return (
      <div className="text-center">
        <p className="text-2xl font-bold text-red-500">Time's Up!</p>
      </div>
    );
  }

  const timeBlocks = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ];

  return (
    <div className="flex justify-center gap-4">
      {timeBlocks.map((block, index) => (
        <div key={index} className="text-center">
          <div className="bg-primary-600 text-white rounded-lg p-4 min-w-[80px]">
            <div className="text-3xl font-bold font-display">
              {String(block.value).padStart(2, '0')}
            </div>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            {block.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;