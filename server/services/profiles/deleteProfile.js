export const deleteProfile = async (query) => {
  const result = await Profile.findOneAndDelete(query);
  return result;
};