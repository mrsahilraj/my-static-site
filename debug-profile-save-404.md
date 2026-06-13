# [OPEN] Debug Session: `profile-save-404`

## Symptom
- Clicking `Save Changes` in Edit Profile returns `Request failed (404)`.

## Expected
- Profile data saves successfully and updates immediately in the UI.

## Hypotheses
1. The frontend is calling `/api/auth/profile`, but the running backend process does not actually expose that route yet.
2. The frontend request is being sent to the wrong origin or bypassing the Vite proxy, so `/api/auth/profile` resolves to a non-existent route.
3. The backend route exists in code, but the dev server/API server has not been restarted since the route was added.
4. The HTTP method or payload shape does not match the backend expectation, causing an unexpected route miss or upstream handler failure.
5. The auth session/cookie is missing in the request context and a fallback/non-API route is returning the visible 404.

## Plan
- Add instrumentation to capture the exact request URL, method, payload shape, response status, and server-side route hit.
- Reproduce and compare evidence from client and server.
- Apply the minimal fix only after evidence identifies the root cause.
