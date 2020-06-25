# git checkout --orphan gh-pages 
# npm run build

# # (for react: replace dist with build)
# git --work-tree dist add --all
# git --work-tree dist commit -m 'Deploy'
# git push origin HEAD:gh-pages --force
# rm -r dist
# git checkout -f master
# git branch -D gh-pages