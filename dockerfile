FROM nginx
MAINTAINER Tyler Candee <tyler@candeegenerations.com>

# Copy source code to image
COPY wwwroot /usr/share/nginx/html

# Build using this command
# docker build -t cgen01/react-template .

# Run using this command
# docker run -p 9001:80 cgen01/react-template
