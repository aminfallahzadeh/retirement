// IMPORTS
import { Stack, LinearProgress } from "@mui/material";

export const SuspenseFallback = () => {
  const content = (
    <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 bottom-0">
      <Stack sx={{ width: 300 }} spacing={2}>
        <LinearProgress
          color="primary"
          variant="indeterminate"
          sx={{ height: 8, borderRadius: 20 }}
        />
      </Stack>
    </div>
  );
  return content;
};
