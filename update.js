const fs = require('fs');
let c = fs.readFileSync('d:/Thư mục mới (5)/parago/frontend/src/app/rides/[id]/page.tsx', 'utf8');

c = c.replace(
  '<h3 className="text-lg font-bold text-[var(--text-heading)]">Hành khách ghép xe</h3>',
  '<div className="flex items-center justify-between"><h3 className="text-lg font-bold text-[var(--text-heading)]">Hành khách ghép xe</h3>{canManage && <Button size="sm" variant="outline" onClick={fetchPreviousPassengers}>Mời bạn cũ</Button>}</div>'
);

// We also need a Modal to display previous passengers
const modalCode = `
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface-0 w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-bold text-[var(--text-heading)]">Mời khách quen</h2>
              <button onClick={() => setShowInviteModal(false)} className="p-2 text-surface-500 hover:bg-surface-100 rounded-full transition-colors"><IconX size={20} /></button>
            </div>
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {previousPassengers.length === 0 ? (
                <div className="text-center py-8 text-surface-500">
                  <IconUsers size={48} className="mx-auto mb-3 opacity-20" />
                  <p>Bạn chưa có khách quen nào.</p>
                </div>
              ) : (
                previousPassengers.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 border border-border rounded-xl">
                    <div className="flex items-center gap-3">
                      <Avatar name={p.name} size="md" />
                      <div>
                        <div className="font-semibold text-sm">{p.name}</div>
                        <div className="text-xs text-surface-500 flex items-center gap-1">
                          <IconStar size={12} className="text-yellow-500 fill-yellow-500" />
                          {Number(p.rating || 5.0).toFixed(1)}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleInvite(p.id)}>Mời</Button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
`;

c = c.replace('</AppLayout>', modalCode + '\n      </AppLayout>');
fs.writeFileSync('d:/Thư mục mới (5)/parago/frontend/src/app/rides/[id]/page.tsx', c);
