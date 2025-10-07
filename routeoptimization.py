from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/get-route', methods=['POST'])
def get_route():
    try:
        data = request.json
        start_lat = data["start_lat"]
        start_lon = data["start_lon"]
        end_lat = data["end_lat"]
        end_lon = data["end_lon"]

        # Google Maps URL
        google_maps_url = f"https://www.google.com/maps/dir/{start_lat},{start_lon}/{end_lat},{end_lon}/"
        osm_url = f"https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route={start_lat},{start_lon};{end_lat},{end_lon}"

        return jsonify({"google_maps": google_maps_url, "osm": osm_url})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Make sure you use correct port
