const fs = require('fs');
let c = fs.readFileSync('d:/Thư mục mới (5)/parago/frontend/src/app/rides/[id]/page.tsx', 'utf8');
c = c.replace(/import \{ IconUsers, IconStar \} from '@tabler\/icons-react';\r?\n$/m, '');
c = c.replace(/\} from "@tabler\/icons-react";/, ', IconUsers, IconStar } from "@tabler/icons-react";');
fs.writeFileSync('d:/Thư mục mới (5)/parago/frontend/src/app/rides/[id]/page.tsx', c);
