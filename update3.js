const fs = require('fs');
let c = fs.readFileSync('d:/Thư mục mới (5)/parago/frontend/src/components/features/rides/PassengerRidesTab.tsx', 'utf8');

const hookStr = `  const [filter, setFilter] = useState<SubFilter>("ALL");`;
const newHookStr = hookStr + `
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const router = useRouter();
  React.useEffect(() => { 
    apiClient.get("/rides/suggested-by-schedules").then(res => setSuggestions(res.data)).catch(console.error); 
  }, []);
`;
c = c.replace(hookStr, newHookStr);
c = c.replace('import { useRouter } from "next/navigation";', '');

const renderStr = `    <div className="space-y-4">`;
const newRenderStr = renderStr + `
      {suggestions.length > 0 && filter === "ALL" && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📅</span>
            <h3 className="text-lg font-bold text-[var(--text-heading)]">Gợi ý theo TKB tuần này</h3>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
            {suggestions.map(s => (
              <div key={s.id} className="min-w-[280px]" onClick={() => router.push(\`/rides/\${s.id}\`)}>
                <RideCard ride={s} index={0} showAction={false} />
              </div>
            ))}
          </div>
        </div>
      )}`;
c = c.replace(renderStr, newRenderStr);

fs.writeFileSync('d:/Thư mục mới (5)/parago/frontend/src/components/features/rides/PassengerRidesTab.tsx', c);
